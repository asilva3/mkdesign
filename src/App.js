import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: {}
    };
    this.getData = this.getData.bind(this);
  }

  async getData(event) {
      event.preventDefault();
      fetch('https://fwuloepxjl.execute-api.us-west-2.amazonaws.com/prod/getuserprofile')
      .then((response) => {
        return response.json();
      })
      .then(responseData => {
        return responseData;
      })
      .then(data => {
        this.setState(state => ({
          isLoading: false,
          dataSource: data
        }));
      },
      (error) => {
        console.error(error);
      })
  }

  render() {
    let { dataSource } = this.state;
    if (this.state.isLoading) {
      return <form onSubmit={this.getData}>
                <input type="submit" value="View Clients" />
              </form>;
    } else {
      return (
        <div>
          <Table id="employeeProfile">

        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Message</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {dataSource.map(item =>
            <TableRow key={item.email}>
              <TableCell component="th" scope="row">{item.name}</TableCell>
              <TableCell align="right">{item.email}</TableCell>
              <TableCell align="right">{item.message}</TableCell>
            </TableRow>
          )}
          </TableBody>
          </Table>
        </div>
      );
    }
  }
}