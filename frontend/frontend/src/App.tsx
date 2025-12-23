import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { typesApi, efficiencyRatingsApi, powerSuppliesApi, Type, EfficiencyRating, PowerSupply, TypeDTO, EfficiencyRatingDTO, PowerSupplyDTO } from './api';
import PowerSupplyList from "./components/PowerSupplyList";
import PowerSupplyForm from "./components/PowerSupplyForm";
function App() {
  const [types, setTypes] = useState<Type[]>([]);
  const [efficiencyRatings, setEfficiencyRatings] = useState<EfficiencyRating[]>([]);
  const [powerSupplies, setPowerSupplies] = useState<PowerSupply[]>([]);

  const [newType, setNewType] = useState('');
  const [newEfficiencyRating, setNewEfficiencyRating] = useState('');
  const [editingPowerSupplyId, setEditingPowerSupplyId] = useState<string | null>(null);
  const [newPowerSupply, setNewPowerSupply] = useState<PowerSupplyDTO>({
    brand: '',
    model: '',
    power: 0,
    numberOfPCI: 0,
    numberOfSATA: 0,
    numberOfM2: 0,
    price: 0,
    typeId: '',
    efficiencyRatingId: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [typesData, ratingsData, suppliesData] = await Promise.all([
        typesApi.getAll(),
        efficiencyRatingsApi.getAll(),
        powerSuppliesApi.getAll(),
      ]);
      setTypes(typesData);
      setEfficiencyRatings(ratingsData);
      setPowerSupplies(suppliesData);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const handleCreateType = async () => {
    try {
      await typesApi.create({ type: newType });
      setNewType('');
      loadData();
    } catch (error) {
      console.error('Failed to create type:', error);
    }
  };

  const handleDeleteType = async (id: string) => {
    try {
      await typesApi.delete(id);
      loadData();
    } catch (error) {
      console.error('Failed to delete type:', error);
    }
  };

  const handleCreateEfficiencyRating = async () => {
    try {
      await efficiencyRatingsApi.create({ efficiencyRating: newEfficiencyRating });
      setNewEfficiencyRating('');
      loadData();
    } catch (error) {
      console.error('Failed to create efficiency rating:', error);
    }
  };

  const handleDeleteEfficiencyRating = async (id: string) => {
    try {
      await efficiencyRatingsApi.delete(id);
      loadData();
    } catch (error) {
      console.error('Failed to delete efficiency rating:', error);
    }
  };

  const handleCreatePowerSupply = async () => {
    if (!newPowerSupply.brand.trim() || 
        !newPowerSupply.model.trim() || 
        !newPowerSupply.typeId || 
        !newPowerSupply.efficiencyRatingId ||
        !newPowerSupply.power || 
        newPowerSupply.power <= 0 ||
        !newPowerSupply.price || 
        newPowerSupply.price <= 0) {
      return;
    }
    try {
      await powerSuppliesApi.create(newPowerSupply);
      setNewPowerSupply({
        brand: '',
        model: '',
        power: 0,
        numberOfPCI: 0,
        numberOfSATA: 0,
        numberOfM2: 0,
        price: 0,
        typeId: '',
        efficiencyRatingId: '',
      });
      loadData();
    } catch (error) {
      console.error('Failed to create power supply:', error);
      alert('Failed to create power supply. Please check all fields are filled correctly.');
    }
  };

  const handleEditPowerSupply = (supply: PowerSupply) => {
    setEditingPowerSupplyId(supply.id);
    setNewPowerSupply({
      brand: supply.brand,
      model: supply.model,
      power: supply.power,
      numberOfPCI: supply.numberOfPCI,
      numberOfSATA: supply.numberOfSATA,
      numberOfM2: supply.numberOfM2,
      price: supply.price,
      typeId: supply.type?.id || '',
      efficiencyRatingId: supply.efficiencyRating?.id || '',
    });
  };

  const handleUpdatePowerSupply = async () => {
    if (!editingPowerSupplyId) return;
    if (!newPowerSupply.brand.trim() || 
        !newPowerSupply.model.trim() || 
        !newPowerSupply.typeId || 
        !newPowerSupply.efficiencyRatingId ||
        !newPowerSupply.power || 
        newPowerSupply.power <= 0 ||
        !newPowerSupply.price || 
        newPowerSupply.price <= 0) {
      return;
    }
    try {
      await powerSuppliesApi.update(editingPowerSupplyId, newPowerSupply);
      setEditingPowerSupplyId(null);
      setNewPowerSupply({
        brand: '',
        model: '',
        power: 0,
        numberOfPCI: 0,
        numberOfSATA: 0,
        numberOfM2: 0,
        price: 0,
        typeId: '',
        efficiencyRatingId: '',
      });
      loadData();
    } catch (error) {
      console.error('Failed to update power supply:', error);
      alert('Failed to update power supply. Please check all fields are filled correctly.');
    }
  };

  const handleCancelEdit = () => {
    setEditingPowerSupplyId(null);
    setNewPowerSupply({
      brand: '',
      model: '',
      power: 0,
      numberOfPCI: 0,
      numberOfSATA: 0,
      numberOfM2: 0,
      price: 0,
      typeId: '',
      efficiencyRatingId: '',
    });
  };

  const handleDeletePowerSupply = async (id: string) => {
    try {
      await powerSuppliesApi.delete(id);
      loadData();
    } catch (error) {
      console.error('Failed to delete power supply:', error);
    }
  };

  return (
      <Box
          sx={{
            minHeight: '100vh',
            backgroundColor: '#0d1b2a',
            py: 4,
          }}
      >
        <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          align="center" 
          sx={{ 
            mb: 5, 
            color: 'white',
            fontWeight: 600,
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          Power Supply Management
        </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card 
            elevation={4}
            sx={{ 
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6
              }
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#1a237e', mb: 3 }}>
                Types
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Type name"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newType.trim()) {
                      handleCreateType();
                    }
                  }}
                />
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleCreateType}
                  disabled={!newType.trim()}
                  sx={{ 
                    minWidth: '100px',
                    backgroundColor: '#1a237e',
                    '&:hover': {
                      backgroundColor: '#283593'
                    }
                  }}
                >
                  Add
                </Button>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List>
                {types.map((type) => (
                  <ListItem 
                    key={type.id}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      '&:hover': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                  >
                    <ListItemText 
                      primary={type.type}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        color="error"
                        onClick={() => handleDeleteType(type.id)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card 
            elevation={4}
            sx={{ 
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6
              }
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#1a237e', mb: 3 }}>
                Efficiency Ratings
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Efficiency rating"
                  value={newEfficiencyRating}
                  onChange={(e) => setNewEfficiencyRating(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newEfficiencyRating.trim()) {
                      handleCreateEfficiencyRating();
                    }
                  }}
                />
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleCreateEfficiencyRating}
                  disabled={!newEfficiencyRating.trim()}
                  sx={{ 
                    minWidth: '100px',
                    backgroundColor: '#1a237e',
                    '&:hover': {
                      backgroundColor: '#283593'
                    }
                  }}
                >
                  Add
                </Button>
              </Box>
              <Divider sx={{ my: 2 }} />
              <List>
                {efficiencyRatings.map((rating) => (
                  <ListItem 
                    key={rating.id}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      '&:hover': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                  >
                    <ListItemText 
                      primary={rating.efficiencyRating}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        color="error"
                        onClick={() => handleDeleteEfficiencyRating(rating.id)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card 
            elevation={4}
            sx={{ 
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6
              }
            }}
          >
            <PowerSupplyForm
                newPowerSupply={newPowerSupply}
                types={types}
                efficiencyRatings={efficiencyRatings}
                editingPowerSupplyId={editingPowerSupplyId}
                setNewPowerSupply={setNewPowerSupply}
                handleCreatePowerSupply={handleCreatePowerSupply}
                handleUpdatePowerSupply={handleUpdatePowerSupply}
                handleCancelEdit={handleCancelEdit}
            />
          </Card>
        </Grid>
        <Grid item xs ={12}>
        <PowerSupplyList
          powerSupplies={powerSupplies}
          handleEditPowerSupply={handleEditPowerSupply}
          handleDeletePowerSupply={handleDeletePowerSupply}
        />
        </Grid>
      </Grid>
      </Container>
    </Box>
  );
}
export default App;
