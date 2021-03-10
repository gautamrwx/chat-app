import React, { useCallback, useState } from 'react';
import { Alert, Icon, Input, InputGroup } from 'rsuite';

const EditableInput = ({
  initialValue,
  onSave,
  label = null,
  placeholder = 'Write Value',
  emptyMsg = 'input is empty',
  wrapperClassName = '',
  ...inputProps
}) => {
  const [input, setinput] = useState(initialValue);
  const [isEditable, setisEditable] = useState(false);

  const onInputChange = useCallback(value => {
    setinput(value);
  }, []);

  const onEditClick = useCallback(() => {
    setisEditable(p => !p);
    setinput(initialValue);
  }, [initialValue]);

  const onSaveClick = async () => {
    const trimmed = input.trim();

    if (trimmed === '') {
      Alert.info(emptyMsg, 4000);
    }
    if (trimmed !== initialValue) {
      await onSave(trimmed);
    }

    setisEditable(false);
  };

  return (
    <div className={wrapperClassName}>
      {label}
      <InputGroup>
        <Input
          {...inputProps}
          disabled={!isEditable}
          placeholder={placeholder}
          value={input}
          onChange={onInputChange}
        />
        <InputGroup.Button onClick={onEditClick}>
          <Icon icon={isEditable ? 'close' : 'edit2'} />
        </InputGroup.Button>

        {isEditable && (
          <InputGroup.Button onClick={onSaveClick}>
            <Icon icon="check" />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
};

export default EditableInput;
