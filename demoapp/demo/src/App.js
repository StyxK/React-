import React, { useState, useEffect } from 'react';
import { Segment,Header, Icon,Input,Grid, Container, Button, GridRow, Table} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './App.css';

const App = () => {

  const [author,setAuthor] = useState('anonymous') //เจาะจง state ว่าจะเอาตัวไหนใน data
  const [commit,setCommit] = useState() //ไม่เจาะจง ถ้าจะเจาะจง ไปดึงเอาใน render
  const [files,setFile] = useState(["node_modules","test","build","package.json","GruntFile.js"])

  useEffect(()=>{
    fecthCommit()
  },[])

  const fecthCommit = async () => {
    const commits = await fetch("https://api.github.com/repos/StyxK/React-/commits")
    const data = await commits.json()
    setAuthor(JSON.parse(JSON.stringify(data[0].commit)).author.name) // set ของ author
    setCommit(data[0]) // set ของ commit
    console.log(data[0],"commit")
  }

  const filesInCommit = () => { //วนลูปเพื่อสร้าง row ใน table ตามจำนวน index ใน arrays
    let listOfFiles = []
    files.map( file => { // ต้องใช้ map !
      listOfFiles.push(
        <Table.Row>
          <Table.Cell>
            <Icon name='file outline' /> {file}
          </Table.Cell>
          <Table.Cell>Initial commit</Table.Cell>
          <Table.Cell textAlign='right'>10 hours ago</Table.Cell>
        </Table.Row>
      )
    })
    return( listOfFiles )
  }

  return(
    <Container fluid>
      <Segment inverted>
        <Header inverted>
          <Grid>
            <Grid.Row columns='16'>
              <Grid.Column width={1}>
                <Icon size='big' name="github"/>
              </Grid.Column>
              <Grid.Column width={3}>
                <Input size='mini' className="search" placeholder='Search or jump to...'/>
              </Grid.Column>
              <Grid.Column width={2}>
                <a> Pull Request </a>
              </Grid.Column>
              <Grid.Column width={2}>
                <a> Issue </a>
              </Grid.Column>
              <Grid.Column width={2}>
                <a> Marketplace </a>
              </Grid.Column>
              <Grid.Column width={2}>
                <a> Explore </a>
              </Grid.Column>
              <Grid.Column width={2}>
                <Icon name='plus'/>
              </Grid.Column>
              <Grid.Column width={2}>
                <Icon name='user'/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Header>
      </Segment>
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={7}>
              <p className="reponame">StyxK/React-</p>
            </Grid.Column>
            <Grid.Column width={3}>
              <Button content="Unwatch" icon="eye" label={{basic: true,content:'1'}}/>
            </Grid.Column>
            <Grid.Column width={3}>
              <Button content="Star" icon="star" label={{basic: true,content:'0'}}/>
            </Grid.Column>
            <Grid.Column width={3}>
              <Button content="Fork" icon="fork" label={{basic: true,content:'0'}}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Button>
                <Icon name="code"/> Code 
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button>
                <Icon name="warning circle"/> Issue
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button>
                <Icon name="fork"/> Pull Request
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button>
                <Icon name="code"/> Code 
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={14}>
              มานั่งทำ React กับเพื่อนๆ
            </Grid.Column>
            <Grid.Column>
              <Button>edit</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <Button>Branch: master</Button>
            </Grid.Column>
            <Grid.Column width={3}>
              <Button>New pull request</Button>
            </Grid.Column>
            <Grid.Column width={5}>
              <Button.Group>
                <Button>Creae new file</Button>
                <Button>Upload files</Button>
                <Button>Find file</Button>
              </Button.Group>
            </Grid.Column>
            <Grid.Column width={3}>
              <Button color='green'>Clone or Download</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <Container>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>
                  {
                    commit ? JSON.parse(JSON.stringify(commit.commit)).author.name : 'anonymous'
                  }{" "}
                  {
                    commit ? JSON.parse(JSON.stringify(commit.commit)).message : 'nothing'
                  }
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filesInCommit()}
          </Table.Body>
        </Table>
      </Container>
    </Container>
  )
}

export default App
