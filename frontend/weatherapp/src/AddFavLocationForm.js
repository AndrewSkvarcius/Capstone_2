import React, { useContext,useState } from 'react';
import FavsApi from './FavsApi'; // Adjust the import path based on your project structure
import UserContext from "./auth/UserContext";
import {
Form, Button, Input, Row, Col
} from 'reactstrap';


const AddFavLocationForm = ({ onAdd }) => {
  const [location, setLocation] = useState('');
  const { currentUser, notifyFavoritesUpdated } = useContext(UserContext);
  const userId = currentUser?.id;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Assuming FavsApi has a method to add a favorite location
     
     
      await FavsApi.addFav(location, userId);
      onAdd(location); // Notify the parent component to refresh the list
      console.log(typeof onAdd);
      notifyFavoritesUpdated(); // Notify that a favorite location has been added
      setLocation(''); // Reset the input field after submission
    } catch (error) {
      console.error("Failed to add favorite location:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
        <Input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
        required
      />
        </Col>
      <Col>
      <Button type="submit">Add Favorite</Button>
      </Col>
      
      </Row>
    </Form>
    
    
  );
};

export default AddFavLocationForm;
