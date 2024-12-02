import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import EmailCampaignModal from "./EmailCampaignModal";

const EmailCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [modal, setModal] = useState(false);
  const [activeCampaign, setActiveCampaign] = useState(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = () => {
    axios
      .get("http://localhost:8000/api/email-campaigns/")
      .then((res) => setCampaigns(res.data))
      .catch((err) => console.error(err));
  };

  const toggleModal = () => setModal(!modal);

  const handleSave = (campaign) => {
    toggleModal();
    if (campaign.id) {
      // Update campaign
      axios.put(`http://localhost:8000/api/email-campaigns/${campaign.id}/`, campaign)
        .then(fetchCampaigns)
        .catch(err => console.error(err));
      return;
    }
    // Create new campaign
    axios.post("http://localhost:8000/api/email-campaigns/", campaign)
      .then(fetchCampaigns)
      .catch(err => console.error(err));
  };

  const handleDelete = (campaign) => {
    axios
      .delete(`http://localhost:8000/api/email-campaigns/${campaign.id}/`)
      .then(() => {
        Swal.fire("Deleted!", "Campaign has been deleted.", "success");
        setCampaigns(campaigns.filter((c) => c.id !== campaign.id));
      })
      .catch((err) => console.error(err));
  };

  const createCampaign = () => {
    setActiveCampaign({
      name: "",
      subject: "",
      body: "",
      recipients: "",
    });
    toggleModal();
  };

  const editCampaign = (campaign) => {
    setActiveCampaign(campaign);
    toggleModal();
  };

  return (
    <div className="container">
      <h3 className="text-center my-4">Email Campaign Management</h3>
      <button onClick={createCampaign} className="btn btn-primary mb-3">
        Create New Campaign
      </button>
      <ul className="list-group">
        {campaigns.map((campaign) => (
          <li key={campaign.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <strong>{campaign.name}</strong> - {campaign.subject}
            </span>
            <div>
              <button onClick={() => editCampaign(campaign)} className="btn btn-secondary mr-2">
                Edit
              </button>
              <button onClick={() => handleDelete(campaign)} className="btn btn-danger">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {modal && (
        <EmailCampaignModal
          activeCampaign={activeCampaign}
          toggle={toggleModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default EmailCampaign;
