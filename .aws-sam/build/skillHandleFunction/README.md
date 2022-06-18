# Whole application description
Current application is implemented using an AWS Serverless Application Model (SAM) framework.<br/>
It serves as a back-end for the Yandex Alice 
## Application Architecture

![Traffic Guard Design](https://github.com/cobalt12345/traffic-guard-stream-producer/blob/d161fcbd2567cb9e1941576d7489ac7ecc13a9a5/src/main/resources/Traffic%20Guard%20Architecture.png)

## See how it works
<ul>
    <li>Streaming web application - <a href="https://www.dashcam.talochk.in/">https://www.dashcam.talochk.in</a></li>
    <li>Portal exposing results - <a href="https://www.cars.talochk.in/">https://www.cars.talochk.in/</a></li>
</ul>

## Application component repositories
<ol>
    <li>Web portal application (Amplify/ReactJS) - <a href="https://github.com/cobalt12345/traffic-guard-portal">https://github.com/cobalt12345/traffic-guard-portal</a></li>
    <li>Streaming web application (Amplify/ReactJS) - <a href="https://github.com/cobalt12345/traffic-guard-stream-producer-js">https://github.com/cobalt12345/traffic-guard-stream-producer-js</a></li>
    <li>Standalone streaming application (Java/Spring) - <a href="https://github.com/cobalt12345/traffic-guard-stream-producer">https://github.com/cobalt12345/traffic-guard-stream-producer</a> </li>
    <li>Lambda function (Java) which handles JPEG images received via API Gateway from streaming application. It converts them to the MKV format and sends to the Kinesis Vide Stream (KVS) - <a href="https://github.com/cobalt12345/traffic-guard-webcam-snaps-to-kvs">https://github.com/cobalt12345/traffic-guard-webcam-snaps-to-kvs</a></li>
    <li>Component (Java/Spring/ECS) which consumes each N-th frame from KVS and stores it to S3 bucket. Deployed as a task to ECS - <a href="https://github.com/cobalt12345/traffic-guard-stream-consumer">https://github.com/cobalt12345/traffic-guard-stream-consumer</a></li>
    <li>Lambda function (Java) is triggered when new object appears in S3 bucket. It tries to recognize a plate number and store it to the Dynamo DB - <a href="https://github.com/cobalt12345/traffic-guard-car-license-plates-recognizer">https://github.com/cobalt12345/traffic-guard-car-license-plates-recognizer</a></li>
</ol>