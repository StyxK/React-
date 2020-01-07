import React, { useState, useEffect } from 'react';
import { Segment, Header, Icon, Input, Grid, Container, Button, GridRow, Table, Search, Label, Menu, Image, Divider } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './App.css';

const App = () => {

  const [author, setAuthor] = useState('anonymous') //เจาะจง state ว่าจะเอาตัวไหนใน data
  const [commit, setCommit] = useState() //ไม่เจาะจง ถ้าจะเจาะจง ไปดึงเอาใน render
  const [files, setFile] = useState([])

  useEffect(() => {
    fecthCommit()
  }, [])

  const fecthCommit = async () => {
    const commits = await fetch("https://api.github.com/repos/StyxK/React-/commits")
    const data = await commits.json()
    setAuthor(JSON.parse(JSON.stringify(data[0].commit)).author.name) // set ของ author
    const latestCommit = await fetch("https://api.github.com/repos/StyxK/React-/commits/"+data[0].sha)
    const commitData = await latestCommit.json()
    setCommit(data[0]) // set ของ commit
    setFile(commitData.files) // set ของ commit
    console.log(commitData.files,"file")
    console.log(data[0], "commit")
  }

  const filesInCommit = () => { //วนลูปเพื่อสร้าง row ใน table ตามจำนวน index ใน arrays
    let listOfFiles = []
    files.map(file => { // ต้องใช้ map !
      listOfFiles.push(
        <Table.Row key={file.sha}>
          <Table.Cell>
            <Icon name='file outline' /> {file.filename}
          </Table.Cell>
          <Table.Cell>{JSON.parse(JSON.stringify(commit.commit)).message}</Table.Cell>
          <Table.Cell textAlign='right'>10 hours ago</Table.Cell>
        </Table.Row>
      )
    })
    return (listOfFiles)
  }

  return (
    <Container fluid>
      <Segment className="head">
        <Header inverted>
          <Grid>
            <Grid.Row columns='16'>
              <Grid.Column width={1}>
                <Icon size='big' name="github" />
              </Grid.Column>
              <Grid.Column width={4}>
                <Input size="mini" fluid inverted placeholder='Search or jump to...' />
              </Grid.Column>
              <Grid.Column verticalAlign='middle' width={9}>
                <Button className='navigate'> Pull Request </Button>
                <Button className='navigate'> Issue </Button>
                <Button className='navigate'> Marketplace </Button>
                <Button className='navigate'> Explore </Button>
              </Grid.Column>
              <Grid.Column verticalAlign='middle' width={1}>
                <Icon name='plus' />
              </Grid.Column>
              <Grid.Column verticalAlign='middle' width={1}>
                <Icon name='user' />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Header>
      </Segment>
      <Container fluid className='menuContainer'>
        <Container >
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                <p className="reponame">StyxK/React-</p>
              </Grid.Column>
              <Grid.Column width={6}>
                <Button as='div' labelPosition="right">
                  <Button content="Unwatch" icon="eye" />
                  <Label as='a' basic content='0' />
                </Button>
                <Button as='div' labelPosition="right">
                  <Button content="Star" icon="star" />
                  <Label as='a' basic content='0' />
                </Button>
                <Button as='div' labelPosition="right">
                  <Button content="Fork" icon="fork" />
                  <Label as='a' basic content='0' />
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className='menuBar'>
              <Label as='div' basic icon='code' content='Code'/>
              <Label as='div' basic icon='warning circle' content='Issue'/>
              <Label as='div' basic icon='fork' content='Pull Request'/>
              <Label as='div' basic icon='fork' content='Pull R'/>
            </Grid.Row>
          </Grid>
        </Container>
      </Container>
      <Container className='marginTop'>
        <Grid>
          <Grid.Row>
            <Grid.Column width={14}>
              มานั่งทำ React กับเพื่อนๆ
              </Grid.Column>
            <Grid.Column width={2}>
              <Button>edit</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="info" columns='5'>
            <Grid.Column textAlign='center'>
              <Icon name='clock outline'/>
              3 commits
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Icon name='code branch'/>
              1 branch
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Icon name='box'/>
              0 packages
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Icon name='tag'/>
              0 releases
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Icon name='users'/>
              1 contributor
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={10}>
              <Button>Branch: master</Button>
              <Button>New pull request</Button>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button.Group>
                <Button as={Label} basic>Creae new file</Button>
                <Button as={Label} basic>Upload files</Button>
                <Button as={Label} basic>Find file</Button>
              </Button.Group>
            </Grid.Column>
            <Grid.Column width={2}>
              <Button as={Label} color='green'>Clone or Download</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>
                <Image src="https://avatars1.githubusercontent.com/u/24619157?v=4" size='mini' spaced/>
                {
                  commit ? JSON.parse(JSON.stringify(commit.commit)).author.name : 'anonymous'
                }{" "}
                <span>
                  {
                    commit ? JSON.parse(JSON.stringify(commit.commit)).message : 'nothing'
                  }
                </span>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filesInCommit()}
          </Table.Body>
        </Table>
      </Container>
      <Container>
        <Segment inverted color="blue" className='marginTop'>
          <Grid>
            <Grid.Row>
              <Grid.Column width='14'>
                Help people interested in this repository understand your project by adding a README.
              </Grid.Column>
              <Grid.Column width='2'>
                <Button as={Label} color='green'>Add a README</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
      <Container>
        <Divider/>
        <Grid>
          <Grid.Row>
            <Grid.Column textAlign='left' width='8'>
                <Button disabled className='footer'> ©2020 GitHub, Inc. </Button>
                <Button className='footer'> Terms </Button>
                <Button className='footer'> Privacy </Button>
                <Button className='footer'> Security </Button>
                <Button className='footer'> Status </Button>
                <Button className='footer'> Help </Button>
            </Grid.Column>
            <Grid.Column textAlign='center' width='1'>
              <Icon size='big' name='github'/>
            </Grid.Column>
            <Grid.Column textAlign='right' width='7'>
                <Button className='footer'> Contact GitHub </Button>
                <Button className='footer'> Pricing </Button>
                <Button className='footer'> API </Button>
                <Button className='footer'> Training </Button>
                <Button className='footer'> Blog </Button>
                <Button className='footer'> About </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Container>
  )
}

export default App
