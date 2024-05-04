import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { Tabs } from 'antd'
import Appointments from './Appointments'

function profiles() {
  return (
    <div>
      <Header />
      <div className='min-h-[563]'>
      <Tabs>
        <Tabs.TabPane tab="Appointments" key="1"><Appointments /></Tabs.TabPane>
      </Tabs>
      </div>
      <Footer />
    </div>
  )
}

export default profiles