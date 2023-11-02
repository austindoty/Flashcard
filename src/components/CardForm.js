import React from "react";

function CardForm({ handleSubmit, handleChange, formData, handleCancel }) {
return (
<form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="front">Front</label>
    <textarea
      className="form-control"
      id="front"
      name="front"
      onChange={handleChange}
      value={formData.front}
      placeholder="Front side of card"
    />
    <br />
  </div>
  <div className="form-group">
    <label htmlFor="back">Back</label>
      <textarea
      className="form-control"
      id="back"
      name="back"
      onChange={handleChange}
      value={formData.back}
      placeholder="Back side of card"
      />
    <br />
  </div>
  <button className="btn btn-secondary" onClick={handleCancel}>
    Done
  </button>
  <button className="btn btn-primary" type="submit">
    Save
  </button>
</form>
);
}
export default CardForm;