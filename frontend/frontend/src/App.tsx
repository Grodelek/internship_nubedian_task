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
    <Box sx={{ minHeight: '100vh', backgroundColor: '#1a237e', py: 4 }}>
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
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#1a237e', mb: 3 }}>
                {editingPowerSupplyId ? 'Edit Power Supply' : 'Power Supplies'}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  size="small"
                  label="Brand"
                  value={newPowerSupply.brand}
                  onChange={(e) => setNewPowerSupply({ ...newPowerSupply, brand: e.target.value })}
                />
                <TextField
                  size="small"
                  label="Model"
                  value={newPowerSupply.model}
                  onChange={(e) => setNewPowerSupply({ ...newPowerSupply, model: e.target.value })}
                />
                <TextField
                  size="small"
                  type="number"
                  label="Power (W)"
                  value={newPowerSupply.power || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setNewPowerSupply({ ...newPowerSupply, power: val === '' ? 0 : parseInt(val) || 0 });
                  }}
                  required
                />
                <TextField
                  size="small"
                  type="number"
                  label="Number of PCI"
                  value={newPowerSupply.numberOfPCI || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setNewPowerSupply({ ...newPowerSupply, numberOfPCI: val === '' ? 0 : parseInt(val) || 0 });
                  }}
                />
                <TextField
                  size="small"
                  type="number"
                  label="Number of SATA"
                  value={newPowerSupply.numberOfSATA || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setNewPowerSupply({ ...newPowerSupply, numberOfSATA: val === '' ? 0 : parseInt(val) || 0 });
                  }}
                />
                <TextField
                  size="small"
                  type="number"
                  label="Number of M.2"
                  value={newPowerSupply.numberOfM2 || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setNewPowerSupply({ ...newPowerSupply, numberOfM2: val === '' ? 0 : parseInt(val) || 0 });
                  }}
                />
                <TextField
                  size="small"
                  type="number"
                  inputProps={{ step: '0.01' }}
                  label="Price"
                  value={newPowerSupply.price || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setNewPowerSupply({ ...newPowerSupply, price: val === '' ? 0 : parseFloat(val) || 0 });
                  }}
                  required
                />
                <FormControl size="small" fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={newPowerSupply.typeId}
                    label="Type"
                    onChange={(e) => setNewPowerSupply({ ...newPowerSupply, typeId: e.target.value })}
                  >
                    {types.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="small" fullWidth>
                  <InputLabel>Efficiency Rating</InputLabel>
                  <Select
                    value={newPowerSupply.efficiencyRatingId}
                    label="Efficiency Rating"
                    onChange={(e) => setNewPowerSupply({ ...newPowerSupply, efficiencyRatingId: e.target.value })}
                  >
                    {efficiencyRatings.map((rating) => (
                      <MenuItem key={rating.id} value={rating.id}>
                        {rating.efficiencyRating}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Button
                    variant="contained"
                    startIcon={editingPowerSupplyId ? <EditIcon /> : <AddIcon />}
                    onClick={editingPowerSupplyId ? handleUpdatePowerSupply : handleCreatePowerSupply}
                    fullWidth
                    disabled={
                      !newPowerSupply.brand.trim() ||
                      !newPowerSupply.model.trim() ||
                      !newPowerSupply.typeId ||
                      !newPowerSupply.efficiencyRatingId ||
                      !newPowerSupply.power ||
                      newPowerSupply.power <= 0 ||
                      !newPowerSupply.price ||
                      newPowerSupply.price <= 0
                    }
                    sx={{ 
                      backgroundColor: '#1a237e',
                      '&:hover': {
                        backgroundColor: '#283593'
                      }
                    }}
                  >
                    {editingPowerSupplyId ? 'Update Power Supply' : 'Add Power Supply'}
                  </Button>
                  {editingPowerSupplyId && (
                    <Button
                      variant="outlined"
                      startIcon={<CancelIcon />}
                      onClick={handleCancelEdit}
                      sx={{
                        borderColor: '#1a237e',
                        color: '#1a237e',
                        '&:hover': {
                          borderColor: '#283593',
                          backgroundColor: 'rgba(26, 35, 126, 0.1)'
                        }
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card 
            elevation={4}
            sx={{ 
              mt: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.98)'
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#1a237e', mb: 3 }}>
                All Power Supplies
              </Typography>
              <Grid container spacing={2}>
                {powerSupplies.map((supply) => (
                  <Grid item xs={12} sm={6} md={4} key={supply.id}>
                    <Paper 
                      elevation={3} 
                      sx={{ 
                        p: 2.5, 
                        height: '100%',
                        borderRadius: 2,
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 6,
                          backgroundColor: '#fafafa'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1.5 }}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: '#1a237e' }}>
                          {supply.brand} {supply.model}
                        </Typography>
                        <Box>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleEditPowerSupply(supply)}
                            sx={{
                              mr: 0.5,
                              '&:hover': {
                                backgroundColor: 'rgba(26, 35, 126, 0.1)'
                              }
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeletePowerSupply(supply.id)}
                            sx={{
                              '&:hover': {
                                backgroundColor: 'rgba(211, 47, 47, 0.1)'
                              }
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <Divider sx={{ my: 1.5 }} />
                      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
                        <strong>Power:</strong> {supply.power}W
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
                        <strong>Connectors:</strong> PCI: {supply.numberOfPCI} | SATA: {supply.numberOfSATA} | M.2: {supply.numberOfM2}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
                        <strong>Price:</strong> €{supply.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 500 }}>
                        <strong>Type:</strong> {supply.type?.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        <strong>Efficiency:</strong> {supply.efficiencyRating?.efficiencyRating}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      </Container>
    </Box>
  );
}

export default App;
