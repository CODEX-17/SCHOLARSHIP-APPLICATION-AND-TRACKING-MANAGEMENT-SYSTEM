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
import { getPrograms } from '../../../../Services/programServices';
import { getAccounts } from '../../../../Services/accountServices';
import { getAllRequest } from '../../../../Services/requestServices';
import { getProfiles } from '../../../../Services/profileServices';

const Overview = () => {

  const [accountsList, setAccountsList] = useState([])
  const [programsList, setProgramsList] = useState([])
  const [requestsList, setRequestsList] = useState([])
  const [profilesList, setProfilesList] = useState([])

  const [totalScholars, setTotalScholar] = useState(0)
  const [selectedGraphData, setSelectedGraphData] = useState('daily')


  const handleGetLastYears = () => {

    const currentYear = new Date().getFullYear()
    const lastFiveYears = []

    for (let i = 0; i < 5; i++) {
      lastFiveYears.push(currentYear - i)
    }

    return lastFiveYears
  }

  const listOfYear = handleGetLastYears()

  const monthlyGraph = [
    {
      name: "Monday",
      approved: 0,
      rejected: 0,
      pending: 0,
    },
    {
      name: "Tuesday",
      approved: 0,
      rejected: 0,
      pending: 0,
    },
    {
      name: "Wednesday",
      approved: 0,
      rejected: 0,
      pending: 0,
    },
    {
      name: "Thursday",
      approved: 0,
      rejected: 0,
      pending: 0,
    },
    {
      name: "Friday",
      approved: 0,
      rejected: 0,
      pending: 0,
    },
  ]

  const [yearlyGraph, setYearlyGraph] = useState([])

  const [graphData, setGraphData] = useState([]) 


  const [prograssCircleColor, setPrograssCircleColor] = useState('#6EC207')
  const [progressCirclePercent, setPrograssCirclePercent] = useState(80)

  const handleCalculatePercentage = (value, total) => {
    return Math.round((value/total) * 100)
  }

  const handleChangeProgressCircle = (type) => {

    if (accountsList.length > 0) {
    
      if (type === 'approved') {
        setPrograssCircleColor('#6EC207')
      }else if (type === 'rejected') {
        setPrograssCircleColor('#bd3d3f')
      }else {
        setPrograssCircleColor('#ff7332')
      }

      const filter = accountsList.filter(data => data.account_status == type)
      const result = handleCalculatePercentage(filter.length, accountsList.length)
      return setPrograssCirclePercent(result)
    }

    setPrograssCircleColor('#6EC207')
    setPrograssCirclePercent(0)
    return
  }

  const handleCalculateGraph = (data) => {

    let daily = [
      {
        name: "Monday",
        approved: 0,
        rejected: 0,
        pending: 0,
      },
      {
        name: "Tuesday",
        approved: 0,
        rejected: 0,
        pending: 0,
      },
      {
        name: "Wednesday",
        approved: 0,
        rejected: 0,
        pending: 0,
      },
      {
        name: "Thursday",
        approved: 0,
        rejected: 0,
        pending: 0,
      },
      {
        name: "Friday",
        approved: 0,
        rejected: 0,
        pending: 0,
      },
    ]

    let monthly = [
      {
        name: "January",
        approved: 0,
        rejected: 0,
        pending: 0,
      },
      {
        name: "February",
        approved: 0,
        rejected: 0,
        pending: 0,
      },
      {
        name: "March",
        approved: 0,
        rejected: 0,
        pending: 0,
      },
      {
        name: "April",
        approved: 0,
        rejected: 0,
        pending: 0,
      },
      {
        name: "May",
        approved: 0,
        rejected: 0,
        pending: 0,
      },
      {
        name: "June",
        approved: 0,
        rejected: 0,
        pending: 0,
      },
      {
        name: "July",
        approved: 0,
        rejected: 0,
        pending: 0,
      },
      {
        name: "August",
        approved: 0,
        rejected: 0,
        pending: 0,
      },
      {
        name: "September",
        approved: 0,
        rejected: 0,
        pending: 0,
      },
      {
        name: "October",
        approved: 0,
        rejected: 0,
        pending: 0,
      },
      {
        name: "November",
        approved: 0,
        rejected: 0,
        pending: 0,
      },
      {
        name: "December",
        approved: 0,
        rejected: 0,
        pending: 0,
      },
    ]

    let yearlyData = []

    for (let i = 0; i < data.length; i++) {
      let approved = 0
      let rejected = 0
      let pending = 0

      console.log(data[i])

      if (data[i].request_type === 'program') {

        const [year, month, day] = data[i].date.split('-')

        if (data[i].request_status === 'approved') {
          approved += 1
        }else if (data[i].request_status === 'rejected') {
          rejected += 1
        }else {
          pending += 1
        }

        console.log('approved', approved, 'rej', rejected, 'pen',pending)

        if (yearlyData.includes(year)) {
          yearlyData[i].approved += approved
          yearlyData[i].rejected += rejected
          yearlyData[i].pending += pending
        }else {
          yearlyData.push({
            name: year,
            approved,
            rejected,
            pending,
          })
        }

        const date = new Date(data[i].date)
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })

        daily.forEach((day) => {
          if (day.name === dayName) {
            day.approved += approved
            day.rejected += rejected
            day.pending += pending 
          }
        })

        // daily[parseInt(day) + 1].approved = approved
        // daily[parseInt(day) + 1].rejected = rejected
        // daily[parseInt(day) + 1].pending = pending

        monthly[parseInt(month) + 1].approved = approved
        monthly[parseInt(month) + 1].rejected = rejected
        monthly[parseInt(month) + 1].pending = pending
      }
      
    }

    console.log('yearly', yearlyData)
    console.log('monthly', monthly)
    console.log('day', daily)
    
    return selectedGraphData === 'daily' && daily || selectedGraphData === 'monthly' && monthly || selectedGraphData === 'yearly' && yearlyData

  }

  useEffect(() => {
    const fetchData = async () => {

      const [ accounts, programs, requests, profiles ] = await Promise.all([
        getAccounts(),
        getPrograms(),
        getAllRequest(),
        getProfiles(),
      ])
      
      if (accounts) {
        setPrograssCirclePercent(() => {
          const filter = accounts.filter( data => data.account_status === 'approved')
          return handleCalculatePercentage(filter.length, accounts.length)
        })

        setTotalScholar(() => {
          const filter = accounts.filter(data => data.apply_status === 'applied')
          return handleCalculatePercentage(filter.length, accounts.length)
        })
        setAccountsList(accounts)
      }
      if (programs) setProgramsList(programs)
      if (requests) {
        setRequestsList(requests)
        setGraphData(handleCalculateGraph(requests))
      }
      if (profiles) setProfilesList(profiles)

      console.log(requestsList)
    }

    fetchData()
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
                <h1 style={{ fontSize: '4rem', color: '#6EC207' }}>{requestsList.length || 0}</h1>
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
                <h1 style={{ fontSize: '4rem', color: '#6EC207' }}>{programsList.length || 0}</h1>
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
                <h1 style={{ fontSize: '4rem', color: '#6EC207' }}>{totalScholars}</h1>
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
                data={graphData}
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
                  dataKey="approved"
                  fill="#B3CDAD"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                />
                <Bar
                  dataKey="rejected"
                  fill="#FF5F5E"
                  activeBar={<Rectangle fill="gold" stroke="purple" />}
                />
                <Bar
                  dataKey="pending"
                  fill="rgb(255, 115, 50)"
                  activeBar={<Rectangle fill="gold" stroke="purple" />}
                />
              </BarChart>
            </ResponsiveContainer>
            <div className='d-flex gap-2'>
              <button 
                style={{ width: 100, borderRadius: 5 }} 
                onClick={() =>{ 
                  setSelectedGraphData('daily')
                  setGraphData(handleCalculateGraph(requestsList))
                }}>Daily</button>
              <button 
                style={{ width: 100, borderRadius: 5 }} 
                onClick={() =>{ 
                  setSelectedGraphData('monthly')
                  setGraphData(handleCalculateGraph(requestsList))
                }}>Monthly</button>
              <button 
                style={{ width: 100, borderRadius: 5 }} 
                onClick={() =>{ 
                  setSelectedGraphData('yearly')
                  setGraphData(handleCalculateGraph(requestsList))
                }}>Year</button>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
  