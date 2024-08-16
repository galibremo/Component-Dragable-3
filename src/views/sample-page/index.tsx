import MainCard from 'ui-component/cards/MainCard';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Xarrow, { useXarrow } from 'react-xarrows';
// ==============================|| SAMPLE PAGE ||============================== //

interface Position {
    x: number;
    y: number;
}

interface PosState {
    item1: Position;
    item2: Position;
    item3: Position;
    item4: Position;
    item5: Position;
}

const SamplePage = () => {
    const updateXarrow = useXarrow();
    const [posi, setPosi] = useState<PosState>({
        item1: { x: 0, y: -120 },
        item2: { x: 120, y: 0 },
        item3: { x: 0, y: 0 },
        item4: { x: 0, y: 120 },
        item5: { x: -120, y: 0 }
    });

    const [centerItem, setCenterItem] = useState<keyof PosState>('item3'); // State to track the center item

    const handleDragStop = (itemKey: keyof PosState, e: DraggableEvent, data: DraggableData) => {
        const newPos = { x: data.x, y: data.y };

        setPosi((prevState) => {
            const newState = { ...prevState };

            for (let key in prevState) {
                if (key !== itemKey) {
                    const item = prevState[key as keyof PosState];
                    const distX = Math.abs(item.x - newPos.x);
                    const distY = Math.abs(item.y - newPos.y);

                    if (distX <= 50 && distY <= 50) {
                        // If the overlap is with the center node
                        if (key === centerItem) {
                            setCenterItem(itemKey);
                            const topKey = Object.keys(prevState).find(
                                (k) => prevState[k as keyof PosState].x === 0 && prevState[k as keyof PosState].y === -120
                            ) as keyof PosState;

                            const bottomKey = Object.keys(prevState).find(
                                (k) => prevState[k as keyof PosState].x === 0 && prevState[k as keyof PosState].y === 120
                            ) as keyof PosState;

                            const rightKey = Object.keys(prevState).find(
                                (k) => prevState[k as keyof PosState].x === 120 && prevState[k as keyof PosState].y === 0
                            ) as keyof PosState;

                            const leftKey = Object.keys(prevState).find(
                                (k) => prevState[k as keyof PosState].x === -120 && prevState[k as keyof PosState].y === 0
                            ) as keyof PosState;

                            if (itemKey === topKey) {
                                newState[itemKey] = { x: 0, y: 0 };
                                newState[bottomKey] = { x: 0, y: -120 };
                                newState[key] = { x: 0, y: 120 };
                            }
                            else if (itemKey === bottomKey) {
                                newState[itemKey] = { x: 0, y: 0 };
                                newState[topKey] = { x: 0, y: 120 };
                                newState[key] = { x: 0, y: -120 };
                            } else if (itemKey === leftKey) {
                                newState[itemKey] = { x: 0, y: 0 };
                                newState[rightKey] = { x: -120, y: 0 };
                                newState[key] = { x: 120, y: 0 };
                            }
                            else if (itemKey === rightKey) {
                                newState[itemKey] = { x: 0, y: 0 };
                                newState[leftKey] = { x: 120, y: 0 };
                                newState[key] = { x: -120, y: 0 };
                            }
                            return newState;
                        }
                        //if center is draged and overlaped with surrounding node
                        else if (itemKey === centerItem) {
                            setCenterItem(key as keyof PosState);
                            newState[itemKey as keyof PosState] = { ...item };
                            newState[key as keyof PosState] = { ...prevState[itemKey as keyof PosState] };
                            return newState;
                        }
                        //if surrounding node is draged and overlaped with surrounding node
                        else {
                            newState[itemKey as keyof PosState] = { ...item };
                            newState[key as keyof PosState] = { ...prevState[itemKey as keyof PosState] };
                            return newState;
                        }
                    }
                }
            }

            // Update the position of the dragged item if no overlap
            // newState[itemKey as keyof PosState] = newPos;
            return newState;
        });
        setTimeout(updateXarrow, 0);
    };
    return (
        <MainCard title="Tree">
            <Container
                maxWidth={false}
                sx={{
                    height: '50vh',
                    bgcolor: 'lightcyan',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}
            >
                <Draggable
                    onDrag={updateXarrow}
                    bounds="parent"
                    position={posi.item1}
                    onStop={(e, data) => {
                        handleDragStop('item1', e, data);
                    }}
                >
                    <Grid
                        container
                        id="item1"
                        sx={{
                            width: '50px',
                            height: '50px',
                            bgcolor: 'lightblue',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '100%',
                            position: 'absolute'
                        }}
                    >
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <span>1</span>
                        </Grid>
                    </Grid>
                </Draggable>
                <Draggable
                    onDrag={updateXarrow}
                    bounds="parent"
                    position={posi.item2}
                    onStop={(e, data) => {
                        handleDragStop('item2', e, data);
                    }}
                >
                    <Grid
                        container
                        id="item2"
                        sx={{
                            width: '50px',
                            height: '50px',
                            bgcolor: 'lightblue',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '100%',
                            position: 'absolute'
                        }}
                    >
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <span>2</span>
                        </Grid>
                    </Grid>
                </Draggable>
                <Draggable
                    onDrag={updateXarrow}
                    bounds="parent"
                    position={posi.item3}
                    onStop={(e, data) => {
                        handleDragStop('item3', e, data);
                    }}
                >
                    <Grid
                        container
                        id="item3"
                        sx={{
                            width: '50px',
                            height: '50px',
                            bgcolor: 'lightblue',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '100%',
                            position: 'absolute'
                        }}
                    >
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <span>3</span>
                        </Grid>
                    </Grid>
                </Draggable>
                <Draggable
                    onDrag={updateXarrow}
                    bounds="parent"
                    position={posi.item4}
                    onStop={(e, data) => {
                        handleDragStop('item4', e, data);
                    }}
                >
                    <Grid
                        container
                        id="item4"
                        sx={{
                            width: '50px',
                            height: '50px',
                            bgcolor: 'lightblue',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '100%',
                            position: 'absolute'
                        }}
                    >
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <span>4</span>
                        </Grid>
                    </Grid>
                </Draggable>
                <Draggable
                    onDrag={updateXarrow}
                    bounds="parent"
                    position={posi.item5}
                    onStop={(e, data) => {
                        handleDragStop('item5', e, data);
                    }}
                >
                    <Grid
                        container
                        id="item5"
                        sx={{
                            width: '50px',
                            height: '50px',
                            bgcolor: 'lightblue',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '100%',
                            position: 'absolute'
                        }}
                    >
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <span>5</span>
                        </Grid>
                    </Grid>
                </Draggable>
                <Xarrow showHead={false} start={centerItem} end="item1" />
                <Xarrow showHead={false} start={centerItem} end="item2" />
                <Xarrow showHead={false} start={centerItem} end="item3" />
                <Xarrow showHead={false} start={centerItem} end="item4" />
                <Xarrow showHead={false} start={centerItem} end="item5" />
            </Container>
            <Container
                maxWidth={false}
                sx={{
                    bgcolor: 'lightcoral',
                    height: '10vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: {
                        xs: 'center',
                        sm: 'flex-start'
                    }
                }}
            >
                <Typography variant="h4">Center item : {centerItem}</Typography>
            </Container>
        </MainCard>
    );
};
export default SamplePage;
