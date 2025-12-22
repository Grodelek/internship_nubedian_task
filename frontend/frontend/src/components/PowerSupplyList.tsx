import React from "react";
import {
    Box,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    IconButton,
    Paper,
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
    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                py: 4,
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
                                                    "&:hover": {
                                                        transform: "translateY(-4px)",
                                                        boxShadow: 6,
                                                        backgroundColor: "#fafafa"
                                                    }
                                                }}
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
                                                            onClick={() =>
                                                                handleEditPowerSupply(supply)
                                                            }
                                                            sx={{
                                                                mr: 0.5,
                                                                "&:hover": {
                                                                    backgroundColor:
                                                                        "rgba(26, 35, 126, 0.1)"
                                                                }
                                                            }}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            size="small"
                                                            color="error"
                                                            onClick={() =>
                                                                handleDeletePowerSupply(supply.id)
                                                            }
                                                            sx={{
                                                                "&:hover": {
                                                                    backgroundColor:
                                                                        "rgba(211, 47, 47, 0.1)"
                                                                }
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
        </Box>
    );
};

export default PowerSupplyList;
