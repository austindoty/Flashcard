import React from "react";

function CardForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = React.useState(initialData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Front</label>
        <textarea
          id="front"
          name="front"
          className="form-control"
          onChange={handleChange}
          type="text"
          value={formData.front}
        />
      </div>
      <div className="form-group">
        <label>Back</label>
        <textarea
          id="back"
          name="back"
          className="form-control"
          onChange={handleChange}
          type="text"
          value={formData.back}
        />
      </div>
      <button className="btn btn-secondary mx-1" onClick={onCancel}>
        Cancel
      </button>
      <button className="btn btn-primary mx-1" type="submit">
        Save
      </button>
    </form>
  );
}

export default CardForm;
