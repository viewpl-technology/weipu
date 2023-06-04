import { ReactElement } from 'react'
import Layout from '../../components/dashboard/layout'

export default function Dashboard() {
  return <h3>Dashboard</h3>
}

Dashboard.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
