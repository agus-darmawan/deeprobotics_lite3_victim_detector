import { useEffect, useState } from 'react';
const ROSLIB = require('roslib');

function RosComponent() {
    const [ros, setRos] = useState(null);
    const [connected, setConnected] = useState(false);
    const [pointCloudData, setPointCloudData] = useState(null);
    const [personStatus, setPersonStatus] = useState(null);

    useEffect(() => {
        const rosInstance = new ROSLIB.Ros({
            url: 'ws://localhost:9090'
        });

        rosInstance.on('connection', () => {
            console.log('Connected to rosbridge WebSocket!');
            setConnected(true);
        });

        rosInstance.on('error', (error) => {
            console.log('Error connecting to rosbridge WebSocket: ', error);
        });

        rosInstance.on('close', () => {
            console.log('Connection to rosbridge WebSocket closed!');
            setConnected(false);
        });

        if (connected) {
            const pointCloudTopic = new ROSLIB.Topic({
                ros: rosInstance,
                name: '/points_raw',
                messageType: 'sensor_msgs/PointCloud2'
            });
            const personStatusTopic = new ROSLIB.Topic({
                ros: rosInstance,
                name: '/fall_detection',
                messageType: 'std_msgs/String'
            });

            pointCloudTopic.subscribe(function (message) {
                setPointCloudData(message);
            });
            personStatusTopic.subscribe(function (message) {
                if (message.data === 'victim') {
                setPersonStatus("Korban Terdeteksi");
             } else {
                 setPersonStatus("Tidak Ada Korban Terdeteksi");
              }}

            );

            // Cleanup
            return () => {
                pointCloudTopic.unsubscribe();
                personStatusTopic.unsubscribe();
            };
        }

        setRos(rosInstance);
    }, [connected]);


    return { connected, pointCloudData, personStatus };
}

export default RosComponent;
