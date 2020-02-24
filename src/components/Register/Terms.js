import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

class TermsAndConds extends Component {

  render(){
     return(
       <div>
        <Typography>
          TERMS AND CONDITIONS
        </Typography>
        <p>These are the &nbsp;
        <Link href="/terms-and-conditions">
          terms and conditions
        </Link>
        </p>
       </div>
     )
  }
}

export default TermsAndConds
