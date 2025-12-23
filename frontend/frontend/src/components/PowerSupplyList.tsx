import React, {useState} from "react";
import {
    Box,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    IconButton,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {PowerSupply} from "../api";
interface PowerSupplyListProps {
    powerSupplies: PowerSupply[];
    handleEditPowerSupply: (supply: PowerSupply) => void;
    handleDeletePowerSupply: (id: PowerSupply["id"]) => void;
}
const PowerSupplyList: React.FC<PowerSupplyListProps> = ({
                             powerSupplies,
                             handleEditPowerSupply,
                             handleDeletePowerSupply,
                         }) => {
    const [selectedSupply, setSelectedSupply] = useState<PowerSupply | null>(null);

    const closeDetails = () => setSelectedSupply(null);

    return (
        <Box
            sx={{
                py: 2,
            }}
        >
            <Container maxWidth="lg">
                <Grid container>
                    <Grid item xs={12}>
                        <Card
                            elevation={4}
                            sx={{
                                mt: 2,
                                backgroundColor: "rgba(255, 255, 255, 0.98)"
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{ fontWeight: 600, color: "#1a237e", mb: 3 }}
                                >
                                    All Power Supplies
                                </Typography>

                                <Grid container spacing={3}>
                                    {powerSupplies.map((supply: any) => (
                                        <Grid item xs={12} sm={6} md={4} key={supply.id}>
                                            <Paper
                                                elevation={3}
                                                sx={{
                                                    p: 2.5,
                                                    borderRadius: 2,
                                                    transition: "transform 0.2s, box-shadow 0.2s",
                                                    cursor: "pointer",
                                                    "&:hover": {
                                                        transform: "translateY(-4px)",
                                                        boxShadow: 6,
                                                        backgroundColor: "#fafafa"
                                                    }
                                                }}
                                                onClick={() => setSelectedSupply(supply)}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "flex-start",
                                                        mb: 1.5
                                                    }}
                                                >
                                                    <Typography
                                                        variant="h6"
                                                        sx={{ fontWeight: 600, color: "#1a237e" }}
                                                    >
                                                        {supply.brand}
                                                    </Typography>

                                                    <Box>
                                                        <IconButton
                                                            size="small"
                                                            color="primary"
                                                            sx={{
                                                                mr: 0.5,
                                                                "&:hover": {
                                                                    backgroundColor:
                                                                        "rgba(26, 35, 126, 0.1)"
                                                                }
                                                            }}
                                                            onMouseDown={(e) => e.stopPropagation()}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleEditPowerSupply(supply);
                                                            }}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            size="small"
                                                            color="error"
                                                            sx={{
                                                                "&:hover": {
                                                                    backgroundColor:
                                                                        "rgba(211, 47, 47, 0.1)"
                                                                }
                                                            }}
                                                            onMouseDown={(e) => e.stopPropagation()}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeletePowerSupply(supply.id);
                                                            }}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                                <Divider sx={{ my: 1.5 }} />
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    gutterBottom
                                                    sx={{ fontWeight: 700 }}
                                                >
                                                    <strong>Model:</strong> {supply.model}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ fontWeight: 700 }}
                                                >
                                                    <strong>Type:</strong>{" "}
                                                    {supply.type?.type}
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
            <Dialog
                open={!!selectedSupply}
                onClose={closeDetails}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    {selectedSupply?.brand} {selectedSupply?.model}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography sx={{mb: 1}}><strong>Type:</strong> {selectedSupply?.type?.type}</Typography>
                    <Typography sx={{mb: 1}}><strong>Efficiency:</strong> {selectedSupply?.efficiencyRating?.efficiencyRating}</Typography>
                    <Typography sx={{mb: 1}}><strong>Power:</strong> {selectedSupply?.power} W</Typography>
                    <Typography sx={{mb: 1}}><strong>PCI:</strong> {selectedSupply?.numberOfPCI}</Typography>
                    <Typography sx={{mb: 1}}><strong>SATA:</strong> {selectedSupply?.numberOfSATA}</Typography>
                    <Typography sx={{mb: 1}}><strong>M.2:</strong> {selectedSupply?.numberOfM2}</Typography>
                    <Typography sx={{mb: 1}}><strong>Price:</strong> €{selectedSupply?.price}</Typography>
                </DialogContent>
                <DialogActions sx={{px: 3, pb: 2}}>
                    <Button
                        variant="outlined"
                        onClick={closeDetails}
                    >
                        Close
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => {
                            if (selectedSupply) {
                                handleEditPowerSupply(selectedSupply);
                            }
                            closeDetails();
                        }}
                        sx={{
                            backgroundColor: "#1a237e",
                            "&:hover": {backgroundColor: "#283593"}
                        }}
                    >
                        Update Power Supply
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PowerSupplyList;
