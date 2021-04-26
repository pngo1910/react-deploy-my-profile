
import background from './assests/background/663173.jpg'
import React, { useState, useEffect } from "react";
import './App.css';
import LottieAnimation from './Lottie';
import glassHour from './assests/hourglass/2112-hourglass.json';
import wrongNoti from './assests/33620-wrong-notif.json';
import rightNoti from './assests/8193-unlocked.json'
import profile from './assests/profile.jpg'
import sun from './assests/sun.svg'
import teenager from './assests/teenager.png'
import globe from './assests/globe.png'
import graduation from './assests/graduation.png'
import suitcase from './assests/suitcase.png'
import { Input, Modal, Button, Row, Col, Image, Timeline } from 'antd';
import { PhoneFilled, MailFilled, FacebookFilled, InstagramFilled, LinkedinFilled } from '@ant-design/icons'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";

const data = [
  {
    subject: 'Web Developer',
    A: 100,

  },
  {
    subject: 'Native App Developer',
    A: 85,

  },
  {
    subject: 'Networking',
    A: 60,

  },
  {
    subject: 'Software Developer',
    A: 75,

  },
  {
    subject: 'Data Analyst',
    A: 65,

  },
  {
    subject: 'Database Developer',
    A: 75,

  },
];
const BarData = [
  {
    name: 'ReactJS',
    score: 1000,
  },
  {
    name: 'React Native',
    score: 850,
  },
  {
    name: 'NodeJS',
    score: 800,
  },
  {
    name: 'PHP',
    score: 650,
  },
  {
    name: 'Java',
    score: 600,
  },
  {
    name: 'C#',
    score: 600,
  },
  {
    name: 'Ruby On Rails',
    score: 550,
  },
];

var moment = require('moment'); // require

function AgeCalculator() {

  const startTime = moment([1997, 10, 19])
  var duration = moment.duration(moment().diff(startTime));
  var seconds = duration.asSeconds();
  return seconds
}

function findMyAge(age) {
  let seconds = AgeCalculator()
  let ageDif = (seconds / 31536000) % age
  return (0 < ageDif && ageDif < 1 && age !== 1)
}

const { Search } = Input;

function App() {

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;

function Home() {
  const now = AgeCalculator();

  const [dt, setDt] = useState(now);

  const [result, setResult] = useState(false)

  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(AgeCalculator())
    }, 1000)

    return () => clearInterval(secTimer);
  }, []);

  //Search the age
  const onSearch = value => {
    setResult(result => result = findMyAge(value))
    setIsModalVisible(true);
  };

  //Handle Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const history = useHistory()

  const handleOk = () => {

    setIsModalVisible(false);
    history.push("/about")
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return <div className="App">
    <header className="App-header">
      <div style={{ position: 'absolute', top: 10 }}>
        <h2 style={{ color: "#fff" }}>{dt}</h2>
      </div>
      <img src={background} className="App-logo" alt="logo" />
      <div style={{ position: 'absolute', }}>
        <LottieAnimation lotti={glassHour} height={250} width={250} />
      </div>
      <div style={{ position: "absolute", bottom: 10 }}>
        <Search
          style={{ height: "10vmin" }}
          size="large"
          placeholder="Can you guess my age?"
          enterButton="Check"
          onSearch={onSearch}
        />
      </div>
    </header>
    {/* right model */}
    {result && <Modal visible={isModalVisible} onCancel={handleCancel}
      footer={[
        <Button
          type="primary"
          onClick={handleOk}
          style={{ margin: "auto", display: 'block' }}
        >
          Connect
            </Button>]}>
      <LottieAnimation lotti={rightNoti} height={250} width={250} />
      <h1 style={{ textAlign: 'center' }}>Congrats!!! I know you knew it ^_^</h1>
    </Modal>}
    {!result && <Modal visible={isModalVisible} onCancel={handleCancel} footer={[
      <Button
        type="primary"
        onClick={handleCancel}
      >
        Try Again
            </Button>]}>
      <LottieAnimation lotti={wrongNoti} height={250} width={250} />
      <h1 style={{ textAlign: 'center' }}>Please Try Again!!!</h1>
    </Modal>}
  </div>;
}

function About() {
  return <div className="App">
    <header className="App-header">
      <Row gutter={[16, 16]} style={{ width: '100%', height: '50vh' }}>
        <Col span={12}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              layout="vertical"
              data={BarData}
              margin={{
                top: 20,
                right: 50,
                bottom: 20,
                left: 50,
              }}

            >

              <XAxis type="number" style={{ padding: '16px 16px 16px 16px' }} />
              <YAxis dataKey="name" type="category" scale="band" style={{ padding: '20px 20px 20px 20px' }} />
              <Tooltip />
              <Bar dataKey="score" barSize={20} fill="#56e547" />
            </ComposedChart>
          </ResponsiveContainer>
        </Col>
        <Col span={12}>

          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'red' }} />
              <Radar name="Mike" color="#fff" dataKey="A" stroke="#fff" fill="#19ff00" fillOpacity={0.8} />
            </RadarChart>
          </ResponsiveContainer>
        </Col>
      </Row>
      <Image
        style={{ borderRadius: 500, position: 'absolute', margin: 'auto', display: 'block', boxShadow: "inset 2px 0px 30px 4px rgba(0, 0, 0, 1)" }}
        width={300}
        src={profile}
      />
      <Row gutter={[16, 16]} style={{ width: '100%', height: '50vh' }}>

        <Col span={12}>
          <Timeline mode="left" style={{ color: "white", float: 'left', height: '45vh' }}>
            <Timeline.Item
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center'
              }}
              dot={<Image
                width={20}
                src={sun}
              />} label="   1997-19-10   ">Came to Earth For The First Time, Arrived at Da Nang, Viet Nam.</Timeline.Item>
            <Timeline.Item
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center'
              }}
              dot={<Image
                width={20}
                src={teenager}
              />}
              label="   2015-01-08   ">Left Highschool because of DaNang University of Science and Technology's invitation.</Timeline.Item>
            <Timeline.Item
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center'
              }}
              dot={<Image
                width={20}
                src={globe}
              />}
              label="2017-19-04">Arrived at YWG Airport, Winnipeg MB Canada. Prepared to go to Red River College.</Timeline.Item>
            <Timeline.Item
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center'
              }}
              dot={<Image
                width={20}
                src={graduation}
              />}
              label="2020-01-01">Graduated Business Information Technology at Red River College.</Timeline.Item>
            <Timeline.Item
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center'
              }}
              dot={<Image
                width={20}
                src={suitcase}
              />}
              label="2020-06-07">After the attacks of COVID-19, being paid for working in a big big SAAS Project.</Timeline.Item>
          </Timeline>
        </Col>
        <Col span={12}>
          <h2 style={{ color: "white" }}>Contact me</h2>
          <div style={{ paddingLeft: 250 }}>
            <Row>

              <p>
                <MailFilled color="white" /> thuanphong1910@gmail.com
  </p>
            </Row>

            <Row>
              <p>
                <PhoneFilled color="white" /> +1 (204) 914-9094
  </p>

            </Row>
            <Row style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: 20 }}>
              <Col>
                <a href="https://www.facebook.com/pgee.1910/">
                  <FacebookFilled style={{ fontSize: 65, color: "blue", margin: 25 }} />
                </a>

              </Col>
              <Col>
                <a href="https://www.instagram.com/pgee1910/">
                  <InstagramFilled style={{ fontSize: 65, color: "red", margin: 25 }} />
                </a>

              </Col>
              <Col>
                <a href="https://www.linkedin.com/in/phong-ngo-17a817149/">
                  <LinkedinFilled style={{ fontSize: 65, color: "yellow", margin: 25 }} />
                </a>

              </Col>
            </Row>
          </div>
        </Col>
      </Row>

    </header>
  </div>;
}


