'use client';

import { useState } from "react";
import { toPng } from "html-to-image";
import { Box, Button, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, TextField, Typography } from "@mui/material";


const CarIcon = "/car-icon.png"; // Custom marker image
const FruitIcon = "/fruit-icon.png"; // Custom marker image
const ColorIcon = "/color-icon.png"; // Custom marker image

function MarkerComponent() {
    const [selectedMarker, setSelectedMarker] = useState(CarIcon);
    const [markers, setMarkers] = useState([]);

    // Function to handle new marker addition
    const handleAddMarker = e => {
        const { offsetX, offsetY, target } = e.nativeEvent;
        const { offsetWidth, offsetHeight } = target;

        const newMarker = {
            top: (offsetY / offsetHeight) * 100, // Calculate percentage
            left: (offsetX / offsetWidth) * 100, // Calculate percentage
            icon: selectedMarker, // Save the current marker icon
            comment: "", // Placeholder for marker comments
        };
        setMarkers([...markers, newMarker]);
    };

    // Function to handle comment change for a marker
    const handleCommentChange = (index, comment) => {
        const updatedMarkers = markers.map((marker, i) => (i === index ? { ...marker, comment } : marker));
        setMarkers(updatedMarkers);
    };

    // Function to save the image
    const handleSaveImage = () => {
        const imageContainer = document.getElementById("image-container");
        toPng(imageContainer)
            .then(dataUrl => {
                // Create a download link
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = "marked-image.png";
                link.click();
            })
            .catch(err => {
                console.error("Error saving image:", err);
            });
    };

    return (
        <>
            <Stack direction={'row'} justifyContent={'end'} padding={2}>
                <Button
                    onClick={handleSaveImage}
                    variant="contained"
                >
                    Save
                </Button>
            </Stack>

            <Grid container spacing={2} style={{ textAlign: "center", marginTop: "20px" }}>
                {/* Marker Selection */}
                <Grid item xl={2} lg={2} md={2} borderRight={'2px dashed black'}>

                    <Stack spacing={2}>

                        <List>
                            <ListItemButton
                                onClick={() => setSelectedMarker(CarIcon)}

                            >

                                <ListItemIcon>
                                    <img
                                        style={{ width: "40px" }}
                                        src={CarIcon}
                                        alt="Car Icon"
                                    />

                                </ListItemIcon>
                                <ListItemText primary="Inbox" />
                            </ListItemButton>

                            <ListItemButton
                                onClick={() => setSelectedMarker(ColorIcon)}
                            >

                                <ListItemIcon>
                                    <img
                                        style={{ width: "40px" }}
                                        src={ColorIcon}
                                        alt="Color Icon"
                                    />

                                </ListItemIcon>
                                <ListItemText primary="Inbox" />
                            </ListItemButton>

                            <ListItemButton
                                onClick={() => setSelectedMarker(FruitIcon)}

                            >

                                <ListItemIcon>

                                    <img
                                        style={{ width: "40px" }}
                                        src={FruitIcon}
                                        alt="Fruit Icon"
                                    />

                                </ListItemIcon>
                                <ListItemText primary="Inbox" />
                            </ListItemButton>
                        </List>


                    </Stack>
                </Grid>

                {/* Image Container */}
                <Grid
                    id="image-container"
                    style={{
                        position: "relative",
                        maxWidth: "600px",
                        // maxHeight: "600px",
                        margin: "20px auto",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        overflow: "hidden",
                    }}
                    xl={7}
                    lg={7}
                    md={7}
                    onClick={handleAddMarker} // Add marker on image click
                >
                    <img
                        src={"/test.png"}
                        alt="Sample"
                        style={{ maxHeight: '500px', maxWidth: '600px', }}
                    />
                    {markers.map((marker, index) => (
                        <Box
                            key={index}
                            style={{
                                position: "absolute",
                                top: `${marker.top}%`,
                                left: `${marker.left}%`,
                                transform: "translate(-50%, -50%)",
                                textAlign: "center",
                                zIndex: 10,
                            }}
                        >
                            {/* Custom Marker Image */}
                            <img
                                src={marker.icon}
                                alt={`Marker ${index + 1}`}
                                style={{ width: "24px", height: "24px", cursor: "pointer" }}
                            />
                        </Box>
                    ))}
                </Grid>


                <Grid item xl={3} lg={3} md={3} pr={2}  borderLeft={'2px dashed black'}>
                    <Stack spacing={2} bgcolor={'#f5f6f8'} component={Paper}
                        style={{  maxHeight: '450px', overflowY: 'auto', padding: "10px" }}
                    >

                        <Typography variant="h5">
                            Comments
                        </Typography>

                        {markers.map((marker, index) => (
                            <Stack
                                key={index}
                                spacing={1}
                                paddingRight={2}
                            >
                                {/* Custom Marker Image */}

                                <Box display={'flex'} gap={1}>

                                    <img
                                        src={marker.icon}
                                        alt={`Marker ${index + 1}`}
                                        style={{ width: "20px", maxHeight: "20px", }}
                                    />

                                    {index + 1}.Marker
                                </Box>
                                {/* Comment Input */}

                                <TextField
                                    type="text"
                                    value={marker.comment}
                                    onChange={e => handleCommentChange(index, e.target.value)}
                                    placeholder="Add a comment"
                                    fullWidth
                                />

                            </Stack>
                        ))}
                    </Stack>
                </Grid>


            </Grid>
        </>
    );
}

export default MarkerComponent
