'use client';

import { useEffect, useState } from "react";
import { toPng } from "html-to-image";
import { Box, Button, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, TextField, Typography } from "@mui/material";
import { useGetAssetsQuery } from "@/services/private/assets";
import { useParams, useSearchParams } from "next/navigation";
import { useAddMarkerMutation, useGetMarkerQuery, useUpdateMarkerMutation } from "@/services/private/markers";
import { useSnackbar } from "notistack";

function MarkerComponent({ id, toggle, templateImage }) {
    const { enqueueSnackbar } = useSnackbar();

    const searchParams = useSearchParams();
    const journalId = searchParams.get('journal');


    const { data: assetsTemplates } = useGetAssetsQuery({ template_type: 'marker' });
    const { data: fetchedMarkerData } = useGetMarkerQuery(id);
    const [addMarker] = useAddMarkerMutation();
    const [updateMarker] = useUpdateMarkerMutation();

    const [selectedMarker, setSelectedMarker] = useState(null);
    const [markers, setMarkers] = useState([]);

    console.log('fetchedMarkerData ==> ', fetchedMarkerData)

    // Function to handle new marker addition
    const handleAddMarker = e => {
        if (selectedMarker) {
            const { offsetX, offsetY, target } = e.nativeEvent;
            const { offsetWidth, offsetHeight } = target;

            const newMarker = {
                top: (offsetY / offsetHeight) * 100, // Calculate percentage
                left: (offsetX / offsetWidth) * 100, // Calculate percentage
                icon: selectedMarker, // Save the current marker icon
                comment: "", // Placeholder for marker comments
            };
            setMarkers([...markers, newMarker]);
        }
    };

    // Function to handle comment change for a marker
    const handleCommentChange = (index, comment) => {
        const updatedMarkers = markers.map((marker, i) => (i === index ? { ...marker, comment } : marker));
        setMarkers(updatedMarkers);
    };

    // Function to save the image
    const handleSaveImage = async () => {
        const formData = new FormData();
        const imageContainer = document.getElementById("image-container");

        try {
            // Generate DataURL from the image container
            const dataUrl = await toPng(imageContainer);

            // Convert DataURL to Blob
            const response = await fetch(dataUrl);
            const blob = await response.blob();

            // Append the Blob (image file) to FormData
            formData.append('marker_image', blob, 'marked-image.png');
            formData.append('meta_data', JSON.stringify(markers)); // Assuming markers is an object or array
            formData.append('journal', journalId);
            formData.append('marker_name', 'test');
            formData.append('id', id);

            // Call your API or function to submit the FormData

            if (id) {
                await updateMarker({ body: formData, id });
                enqueueSnackbar('Updated Succesfully', { variant: 'success' });
            } else {
                await addMarker(formData);
                enqueueSnackbar('Saved Succesfully', { variant: 'success' });
            }

            toggle();
        } catch (err) {
            console.error("Error saving image:", err);
        }
    };

    console.log('fetchedMarkerData ==> ', fetchedMarkerData)

    useEffect(() => {
        if (fetchedMarkerData?.meta_data) {
            setMarkers(
                fetchedMarkerData?.meta_data
            )
        }
    }, [fetchedMarkerData])

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
                            {
                                assetsTemplates?.results?.map((item) => (
                                    <ListItemButton
                                        onClick={() => setSelectedMarker(item?.image)}
                                    >
                                        <ListItemIcon>
                                            <img
                                                style={{ width: "40px" }}
                                                src={item?.image}
                                                alt="Car Icon"
                                            />

                                        </ListItemIcon>
                                        <ListItemText primary={item?.title} />
                                    </ListItemButton>
                                ))
                            }
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
                        // overflow: "hidden",
                    }}
                    xl={7}
                    lg={7}
                    md={7}
                    onClick={handleAddMarker} // Add marker on image click
                >
                    <img
                        src={id ? fetchedMarkerData?.marker_image : templateImage}
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
                            <span style={{ backgroundColor: 'white', padding: 2, borderRadius: 2, fontSize: '10px' }}>
                                {index}
                            </span>
                        </Box>
                    ))}
                </Grid>


                <Grid item xl={3} lg={3} md={3} pr={2} borderLeft={'2px dashed black'}>
                    <Stack spacing={2} bgcolor={'#f5f6f8'} component={Paper}
                        style={{ maxHeight: '450px', overflowY: 'auto', padding: "10px" }}
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
