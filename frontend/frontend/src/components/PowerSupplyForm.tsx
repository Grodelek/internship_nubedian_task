import {
    Box,
    Button,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";
interface PowerSupplyFormProps {
    newPowerSupply: {
        brand: string;
        model: string;
        power: number;
        numberOfPCI: number;
        numberOfSATA: number;
        numberOfM2: number;
        price: number;
        typeId: string;
        efficiencyRatingId: string;
    };
    types: { id: string; type: string }[];
    efficiencyRatings: { id: string; efficiencyRating: string }[];
    editingPowerSupplyId: string | null;
    setNewPowerSupply: React.Dispatch<React.SetStateAction<PowerSupplyFormProps["newPowerSupply"]>>;
    handleCreatePowerSupply: () => void;
    handleUpdatePowerSupply: () => void;
    handleCancelEdit: () => void;
}

const PowerSupplyForm: React.FC<PowerSupplyFormProps> = ({
                                                         newPowerSupply,
                                                         types,
                                                         efficiencyRatings,
                                                         editingPowerSupplyId,
                                                         setNewPowerSupply,
                                                         handleCreatePowerSupply,
                                                         handleUpdatePowerSupply,
                                                         handleCancelEdit
                                                     })=>{
    return (
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
    );
}
export default PowerSupplyForm;