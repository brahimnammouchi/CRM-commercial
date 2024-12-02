import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from "reactstrap";

const EmailCampaignModal = ({ activeCampaign, toggle, onSave }) => {
  const [campaign, setCampaign] = useState(activeCampaign);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaign({ ...campaign, [name]: value });
  };

  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>Email Campaign</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="name">Campaign Name</Label>
            <Input
              type="text"
              name="name"
              value={campaign.name}
              onChange={handleChange}
              placeholder="Enter campaign name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="subject">Subject</Label>
            <Input
              type="text"
              name="subject"
              value={campaign.subject}
              onChange={handleChange}
              placeholder="Enter email subject"
            />
          </FormGroup>
          <FormGroup>
            <Label for="body">Body</Label>
            <Input
              type="textarea"
              name="body"
              value={campaign.body}
              onChange={handleChange}
              placeholder="Enter email content"
            />
          </FormGroup>
          <FormGroup>
            <Label for="recipients">Recipients</Label>
            <Input
              type="text"
              name="recipients"
              value={campaign.recipients}
              onChange={handleChange}
              placeholder="Enter recipient emails, separated by commas"
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => onSave(campaign)}>Save</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default EmailCampaignModal;
