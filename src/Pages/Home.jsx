import React from 'react'
import Layout from '../Component/Layout'

const Home = () => {
  return (
    <>
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.title}>Welcome to HSBC</h1>
        <p style={styles.description}>Experience Excellence in Banking.</p>
      </div>
    </Layout>
    </>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    backgroundColor: '#fffff',
    padding: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop:"50px"
  },
  title: {
    fontSize: '2.5em',
    color: '#00448C',
    marginBottom: '10px',
  },
  description: {
    fontSize: '1.2em',
    color: '#333',
    maxWidth: '600px',
    textAlign: 'center',
    lineHeight: '1.6',
  }
}

export default Home
