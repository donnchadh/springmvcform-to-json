import { INameValuePair, serializeFormData, serializeFormDataArray } from './index';

describe('Array Serialization tests', () => {
  test('First Test', () => {
    const formData: INameValuePair[] = [{ name: 'title', value: 'Test Title' }];
    expect(serializeFormDataArray(formData)).toEqual('{"title":"Test Title"}');
  });
  test('Test with 2 values', () => {
    const formData: INameValuePair[] = [
      { name: 'multiselect', value: 'Value 1' },
      { name: 'multiselect', value: 'Value 2' },
      { name: 'multiselect', value: 'Value 3' }
    ];
    expect(serializeFormDataArray(formData)).toEqual('{"multiselect":["Value 1","Value 2","Value 3"]}');
  });
  test('Nested Object', () => {
    const formData: INameValuePair[] = [
      { name: 'title', value: 'Test Title' },
      { name: 'child.fieldOfChild', value: 'Child Value' },
    ];
    expect(serializeFormDataArray(formData)).toEqual('{"title":"Test Title","child":{"fieldOfChild":"Child Value"}}');
  });
  test('Deeply Nested Object', () => {
    const formData: INameValuePair[] = [
      { name: 'child.child2.child3.fieldOfChild', value: 'Child Value 1' },
      { name: 'child.child2.child4.fieldOfChild', value: 'Child Value 2' },
    ];
    expect(serializeFormDataArray(formData)).toEqual(
      '{"child":{"child2":{"child3":{"fieldOfChild":"Child Value 1"},"child4":{"fieldOfChild":"Child Value 2"}}}}',
    );
  });
  test('Deeply Nested Object With Array Index', () => {
    const formData: INameValuePair[] = [
      { name: 'child.child2[0].child3.fieldOfChild', value: 'Child Value 1' },
      { name: 'child.child2[1].child3.fieldOfChild', value: 'Child Value 2' },
    ];
    expect(serializeFormDataArray(formData)).toEqual(
      '{"child":{"child2":[{"child3":{"fieldOfChild":"Child Value 1"}},{"child3":{"fieldOfChild":"Child Value 2"}}]}}',
    );
  });
});

describe('FormData Serialization tests', () => {
  test('First Test', () => {
    const formData: FormData = new FormData();
    formData.append('title', 'Test Title');
    expect(serializeFormData(formData)).toEqual('{"title":"Test Title"}');
  });
  test('Test with 2 values', () => {
    const formData: FormData = new FormData();
    formData.append('multiselect', 'Value 1');
    formData.append('multiselect', 'Value 2');
    formData.append('multiselect', 'Value 3');
    expect(serializeFormData(formData)).toEqual('{"multiselect":["Value 1","Value 2","Value 3"]}');
  });
  test('Nested Object', () => {
    const formData: FormData = new FormData();
    formData.append('title', 'Test Title');
    formData.append('child.fieldOfChild', 'Child Value');
    expect(serializeFormData(formData)).toEqual('{"title":"Test Title","child":{"fieldOfChild":"Child Value"}}');
  });
  test('Deeply Nested Object', () => {
    const formData: FormData = new FormData();
    formData.append('child.child2.child3.fieldOfChild', 'Child Value 1');
    formData.append('child.child2.child4.fieldOfChild', 'Child Value 2');
    expect(serializeFormData(formData)).toEqual(
      '{"child":{"child2":{"child3":{"fieldOfChild":"Child Value 1"},"child4":{"fieldOfChild":"Child Value 2"}}}}',
    );
  });
  test('Deeply Nested Object With Array Index', () => {
    const formData: FormData = new FormData();
    formData.append('child.child2[0].child3.fieldOfChild', 'Child Value 1');
    formData.append('child.child2[1].child3.fieldOfChild', 'Child Value 2');
    expect(serializeFormData(formData)).toEqual(
      '{"child":{"child2":[{"child3":{"fieldOfChild":"Child Value 1"}},{"child3":{"fieldOfChild":"Child Value 2"}}]}}',
    );
  });
});
