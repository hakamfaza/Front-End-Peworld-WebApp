/* eslint-disable react/display-name */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
  const { token, id } = context.req.cookies

  return {
    props: {
      token : token || null,
      id: id || null
    }
  }
}

export function protectedRoute(Component) {
  return (props) => {
    const router = useRouter()
    useEffect(() => {
      const token = props.token

      if (!token) {
        router.push('login')
      }
    }, [props.token, router])
    return <Component {...props} />
  }
}