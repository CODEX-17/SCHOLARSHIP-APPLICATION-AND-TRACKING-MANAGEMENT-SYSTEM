import React, { useEffect, useState } from 'react'
import style from './Overview.module.css'
import { ProgressCircle } from 'antd-mobile'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
  ResponsiveContainer,
} from "recharts";

const Overview = () => {

  const [accountsList, setAccountsList] = useState([])
  const [programsList, setProgramsList] = useState([])
  const [requestsList, setRequestsList] = useState([])
  const [profilesList, setProfilesList] = useState([])


  const handleGetLastYears = () => {

    const currentYear = new Date().getFullYear()
    const lastFiveYears = []

    for (let i = 0; i < 3; i++) {
      lastFiveYears.push(currentYear - i)
    }

    return lastFiveYears
  }

  const listOfYear = handleGetLastYears()

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
  ];


  const [prograssCircleColor, setPrograssCircleColor] = useState('#6EC207')
  const [progressCirclePercent, setPrograssCirclePercent] = useState(80)

  const handleChangeProgressCircle = (type) => {
    if (type === 'approved') {
      setPrograssCircleColor('#6EC207')
      setPrograssCirclePercent(90)
    }else if (type === 'rejected') {
      setPrograssCircleColor('#bd3d3f')
      setPrograssCirclePercent(100)
    }else {
      setPrograssCircleColor('#ff7332')
      setPrograssCirclePercent(30)
    }
  }


  useEffect(() => {
    console.log(listOfYear)
  },[])

  return (
    <div className={style.container}>
      <div className='row p-4 d-flex flex-column align-items-center justify-content-center w-100 overflow-auto'>
        <div className='w-100 col-sm'>

          <div className='row w-100 p-0 gap-2'>
            
            <div className='col'>
              <div 
                className={style.card} 
                style={{ 
                  width: '100%',
                  padding: 30,
                }}
              >
                <h5><b>Account Status</b></h5>
                <ProgressCircle 
                  percent={progressCirclePercent}
                  style={{
                    '--fill-color': prograssCircleColor,
                    '--size': '200px',
                    '--track-width': '20px',
                  }}
                >{progressCirclePercent}%</ProgressCircle>
                <div className='d-flex w-100 gap-2 mt-4'>
                  <button 
                    style={{ 
                      borderRadius: 30,
                      height: 30, 
                      fontSize: '.8rem'
                    }}
                    onClick={() =>handleChangeProgressCircle('approved')}
                  >Approved</button>
                  <button
                    style={{ 
                      borderRadius: 30,
                      height: 30, 
                      fontSize: '.8rem',
                      backgroundColor: '#bd3d3f'
                    }}
                    onClick={() =>handleChangeProgressCircle('rejected')}
                  >Rejected</button>
                  <button
                    style={{ 
                      borderRadius: 30,
                      height: 30, 
                      fontSize: '.8rem',
                      backgroundColor: '#ff7332',
                    }}
                    onClick={() =>handleChangeProgressCircle('pending')}
                  >Pending</button>
                </div>
                
              </div>
              
            </div>

            <div className='col '>
              <div 
                className={style.card} 
                style={{ 
                  width: '100%',
                  height: '100%',
                  padding: 30,
                }}
              >
                <h3 style={{ fontSize: '1.2rem', textAlign: 'center' }}>Total Number of Scholarship Requests</h3>
                <p style={{ fontSize: '.8rem' }}>A summary of all requests submitted for scholarship programs</p>
                <h1 style={{ fontSize: '4rem', color: '#6EC207' }}>50</h1>
              </div>
              
            </div>

            <div className='col '>
              <div 
                className={style.card} 
                style={{ 
                  width: '100%',
                  height: '100%',
                  padding: 30,
                }}
              >
                <h3 style={{ fontSize: '1.2rem', textAlign: 'center' }}>Total Scholarship Programs Overview</h3>
                <p style={{ fontSize: '.8rem' }}>A comprehensive count of all available scholarship programs</p>
                <h1 style={{ fontSize: '4rem', color: '#6EC207' }}>50</h1>
              </div>
              
            </div>

            <div className='col '>
              <div 
                className={style.card} 
                style={{ 
                  width: '100%',
                  height: '100%',
                  padding: 30,
                }}
              >
                <h3 style={{ fontSize: '1.2rem', textAlign: 'center' }}>Total Number of Scholars</h3>
                <p style={{ fontSize: '.8rem' }}>An overview of the current scholarship beneficiaries</p>
                <h1 style={{ fontSize: '4rem', color: '#6EC207' }}>50</h1>
              </div>
              
            </div>
      
          </div>

        </div>
        <div className='w-100 mt-3 col-sm'>
          <div 
            className={style.card} 
            style={{ 
              width: '100%',
              padding: 30,
            }}
          >
            <h3>Monthly Overview of Scholarship Applications</h3>
            <p>A comparison of approved and rejected applications by month</p>
            <ResponsiveContainer width={"100%"} height={300}>
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="uv"
                  fill="#B3CDAD"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                />
                <Bar
                  dataKey="pv"
                  fill="#FF5F5E"
                  activeBar={<Rectangle fill="gold" stroke="purple" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
  