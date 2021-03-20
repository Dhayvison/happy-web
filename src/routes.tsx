import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap'
import Orphanages from './pages/Orphanage'
import CreateOrphanage from './pages/CreateOrphanage'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/orphanages/create' exact component={CreateOrphanage} />
        <Route path='/orphanages/:id' component={Orphanages} />
        <Route path='/orphanages' component={OrphanagesMap} />
      </Switch>
    </BrowserRouter>
  );
}
