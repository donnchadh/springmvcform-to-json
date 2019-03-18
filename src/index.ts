export interface INameValuePair {
  name: string;
  value: string;
}

interface IPathSegment {
  name: string;
  index?: number;
}

interface IPathValue {
  path: IPathSegment[];
  value: string;
}

type DtoValue = IDto | string;

type DtoOrArray = DtoValue | DtoValue[];

interface IDto {
  [key: string]: DtoOrArray;
}

function newValue(oldValue: DtoOrArray, value: DtoValue): DtoOrArray {
  if (oldValue === undefined) {
      return value;
  }
  if (oldValue instanceof Array) {
      return (oldValue as DtoValue[]).concat(value);
  }
  return [oldValue, value];
}

function setFieldValue(dto: IDto, path: IPathSegment, value: DtoValue) {
  if (path.index !== undefined) {
    let array: DtoValue[] = (dto[path.name] as DtoValue[]) || [];
    if (array.length <= path.index) {
      const extension = new Array<DtoValue>(path.index - array.length + 1);
      array = [...array, ...extension];
    }
    const oldValue = array[path.index];
    array[path.index] = newValue(oldValue, value) as DtoValue;
    dto[path.name] = array;
  } else {
    const oldValue = dto[path.name];
    dto[path.name] = newValue(oldValue, value);
  }
}

function getFieldValue(dto: IDto, path: IPathSegment): DtoValue | DtoValue[] {
  if (path.index !== undefined) {
    const array = dto[path.name] as DtoValue[];
    if (array === undefined) {
      return array;
    }
    return array[path.index];
  } else {
    return dto[path.name];
  }
}

function setPathValue(dto: IDto, path: IPathSegment[], value: string) {
  if (path.length === 1) {
    setFieldValue(dto, path[0], value);
  } else {
    const [head, ...tail] = path;
    let subDto = getFieldValue(dto, head) as IDto;
    if (subDto === undefined) {
      subDto = {};
      setFieldValue(dto, head, subDto);
    }
    setPathValue(subDto, tail, value);
  }
}

function formDataToObject(formData: IPathValue[]): IDto {
  const obj: IDto = {};
  formData.forEach(element => setPathValue(obj, element.path, element.value));
  return obj;
}

function buildPathSegment(segment: string): IPathSegment {
  if (segment.endsWith(']')) {
    const split = segment.split(/[\[\]]/);
    return { name: split[0], index: Number(split[1]) };
  } else {
    return { name: segment };
  }
}

function fieldNameToPathSegments(fieldName: string): IPathSegment[] {
  return fieldName.split('.').map(buildPathSegment);
}

function nameValuePairToPathValue(nameValuePair: INameValuePair): IPathValue {
  return { path: fieldNameToPathSegments(nameValuePair.name), value: nameValuePair.value };
}

export function serializeFormData(formData: INameValuePair[]): string {
  const obj = formDataToObject(formData.map(nameValuePairToPathValue));
  return JSON.stringify(obj);
}
