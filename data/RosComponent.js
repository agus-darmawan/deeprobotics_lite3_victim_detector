import { useEffect, useState } from 'react';
const ROSLIB = require('roslib');

function RosComponent() {
    const [ros, setRos] = useState(null);
    const [connected, setConnected] = useState(false);
    const [pointCloudData, setPointCloudData] = useState(null);
    const [personStatus, setPersonStatus] = useState(null);
    const [yaw, setYaw] = useState(null);
    const [distance, setDistance] = useState(null);
    const [position, setPosition] = useState(null);
    const [velocity, setVelocity] = useState(null);
    const [timeStamp, setTimeStamp] = useState(null);

    useEffect(() => {
        const rosInstance = new ROSLIB.Ros({
            url: 'ws://192.168.1.103:9090'
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
                name: '/camera/depth/color/points',
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
            yawTopic.subscribe(function (message) {
                setYaw(message.data);
            });

            // Subscribe to distance_traveled topic
            const distanceTopic = new ROSLIB.Topic({
                ros: rosInstance,
                name: '/distance_traveled',
                messageType: 'std_msgs/Float32'
            });

            distanceTopic.subscribe(function (message) {
                setDistance(message.data);
            });

            // Subscribe to position topic
            const positionTopic = new ROSLIB.Topic({
                ros: rosInstance,
                name: '/position',
                messageType: 'std_msgs/String'
            });

            positionTopic.subscribe(function (message) {
                setPosition(message.data);
            });

            // Subscribe to velocity topic
            const velocityTopic = new ROSLIB.Topic({
                ros: rosInstance,
                name: '/velocity',
                messageType: 'std_msgs/Float32'
            });

            velocityTopic.subscribe(function (message) {
                setVelocity(message.data);
            });

            // Subscribe to time_stamp topic
            const timeTopic = new ROSLIB.Topic({
                ros: rosInstance,
                name: '/time_stamp',
                messageType: 'std_msgs/String'
            });

            timeTopic.subscribe(function (message) {
                setTimeStamp(message.data);
            });

            // Cleanup
            return () => {
                pointCloudTopic.unsubscribe();
                personStatusTopic.unsubscribe();
                yawTopic.unsubscribe();
                distanceTopic.unsubscribe();
                positionTopic.unsubscribe();
                velocityTopic.unsubscribe();
                timeTopic.unsubscribe();
                personStatusTopic.unsubscribe();
            };
        }

        setRos(rosInstance);
    }, [connected]);


    return { 
        connected, 
        pointCloudData, 
        personStatus, 
        yaw,
        distance,
        position,
        velocity,
        timeStamp,
        personStatus };
}

export default RosComponent;


