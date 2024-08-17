import MainCard from 'ui-component/cards/MainCard';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Xarrow, { useXarrow } from 'react-xarrows';
import { motion } from 'framer-motion';
import useWindowSize from '../../hooks/useWindowSize'; // Import the custom hook

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
    const { width } = useWindowSize();
    const updateXarrow = useXarrow();

    const offset = width < 600 ? 100 : 150; 

    const getInitialPositions = () => ({
        item1: { x: 0, y: -offset },
        item2: { x: offset, y: 0 },
        item3: { x: 0, y: 0 },
        item4: { x: 0, y: offset },
        item5: { x: -offset, y: 0 }
    });

    const [posi, setPosi] = useState<PosState>(getInitialPositions);
    const [centerItem, setCenterItem] = useState<keyof PosState>('item3');

    useEffect(() => {
        setPosi(getInitialPositions);
    }, [width]);

    const handleDragStop = (itemKey: keyof PosState, e: DraggableEvent, data: DraggableData) => {
        const newPos = { x: data.x, y: data.y };

        setPosi((prevState) => {
            const newState = { ...prevState };

            for (let key in prevState) {
                if (key !== itemKey) {
                    const item = prevState[key as keyof PosState];
                    const distX = Math.abs(item.x - newPos.x);
                    const distY = Math.abs(item.y - newPos.y);

                    if (distX <= offset / 2 && distY <= offset / 2) {
                        if (key === centerItem) {
                            setCenterItem(itemKey);
                            const topKey = Object.keys(prevState).find(
                                (k) => prevState[k as keyof PosState].x === 0 && prevState[k as keyof PosState].y === -offset
                            ) as keyof PosState;

                            const bottomKey = Object.keys(prevState).find(
                                (k) => prevState[k as keyof PosState].x === 0 && prevState[k as keyof PosState].y === offset
                            ) as keyof PosState;

                            const rightKey = Object.keys(prevState).find(
                                (k) => prevState[k as keyof PosState].x === offset && prevState[k as keyof PosState].y === 0
                            ) as keyof PosState;

                            const leftKey = Object.keys(prevState).find(
                                (k) => prevState[k as keyof PosState].x === -offset && prevState[k as keyof PosState].y === 0
                            ) as keyof PosState;

                            if (itemKey === topKey) {
                                newState[itemKey] = { x: 0, y: 0 };
                                newState[bottomKey] = { x: 0, y: -offset };
                                newState[key] = { x: 0, y: offset };
                            } else if (itemKey === bottomKey) {
                                newState[itemKey] = { x: 0, y: 0 };
                                newState[topKey] = { x: 0, y: offset };
                                newState[key] = { x: 0, y: -offset };
                            } else if (itemKey === leftKey) {
                                newState[itemKey] = { x: 0, y: 0 };
                                newState[rightKey] = { x: -offset, y: 0 };
                                newState[key] = { x: offset, y: 0 };
                            } else if (itemKey === rightKey) {
                                newState[itemKey] = { x: 0, y: 0 };
                                newState[leftKey] = { x: offset, y: 0 };
                                newState[key] = { x: -offset, y: 0 };
                            }
                            return newState;
                        } else if (itemKey === centerItem) {
                            setCenterItem(key as keyof PosState);
                            newState[itemKey as keyof PosState] = { ...item };
                            newState[key as keyof PosState] = { ...prevState[itemKey as keyof PosState] };
                            return newState;
                        } else {
                            newState[itemKey as keyof PosState] = { ...item };
                            newState[key as keyof PosState] = { ...prevState[itemKey as keyof PosState] };
                            return newState;
                        }
                    }
                }
            }

            return newState;
        });
        // setTimeout(updateXarrow, 0);
    };

    return (
        <MainCard title="Tree">
            <Container
                id="draggable"
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
                {Object.keys(posi).map((key) => (
                    <Draggable
                        bounds="#draggable"
                        key={key}
                        onStop={(e, data) => handleDragStop(key as keyof PosState, e, data)}
                        position={posi[key as keyof PosState]}
                    >
                        <motion.div
                            id={key}
                            animate={{ x: posi[key as keyof PosState].x, y: posi[key as keyof PosState].y }}
                            transition={{ duration: 0.3, type: 'spring', stiffness: 400, damping: 25 }}
                            onUpdate={() => updateXarrow()}
                            style={{
                                width: '50px',
                                height: '50px',
                                backgroundColor: 'lightblue',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '100%',
                                position: 'absolute'
                            }}
                        >
                            <span>{key.replace('item', '')}</span>
                        </motion.div>
                    </Draggable>
                ))}
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
                <Typography variant="h4">Center item: {centerItem}</Typography>
            </Container>
        </MainCard>
    );
};
export default SamplePage;
