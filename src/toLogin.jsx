import React, { useEffect } from 'react'
import { Api } from './Api'
import { useNavigate } from 'react-router-dom'

const toLogin = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(`/login`)
  }, [])

  return (
    <div>sending.....</div>
  )
}

export default toLogin