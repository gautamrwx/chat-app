/* eslint-disable no-unused-vars */
import React, { useCallback, useRef, useState } from 'react';
import firebase from 'firebase/app';
import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Modal,
  Schema,
} from 'rsuite';
import { useModalState } from '../misc/custom-hooks';
import { database } from '../misc/firebase';

const INITIAL_FORM = {
  name: '',
  description: '',
};

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Chat Name Is Required'),
  description: StringType().isRequired('Description is required'),
});

const CreateRoomBtnModal = () => {
  const { isOpen, open, close } = useModalState();
  const [formValue, setformValue] = useState(INITIAL_FORM);
  const [isLoading, setisLoading] = useState(false);

  const formRef = useRef();

  const onFormChange = useCallback(val => {
    setformValue(val);
  }, []);

  const onFormSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }

    setisLoading(true);

    const newRoomData = {
      ...formValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    };

    try {
      await database.ref('rooms').push(newRoomData);
      setisLoading(false);
      setformValue(INITIAL_FORM);
      close();
      Alert.success(`${formValue} Has been created`, 4000);
    } catch (err) {
      setisLoading(false);
      Alert.error(err.message, 4000);
    }
  };

  return (
    <div className="mt-1">
      <Button block color="green" onClick={open}>
        <Icon icon="creative" />
        Create new chat room
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>Nw Chat Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>Room Name</ControlLabel>
              <FormControl name="name" placeholder="Enter Chat Room Name ..." />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                name="description"
                placeholder="Enter Room Description ..."
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            appearance="primary"
            onClick={onFormSubmit}
            disabled={isLoading}
          >
            Create New Chat Room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;
