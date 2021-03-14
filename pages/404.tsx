import styled from '@emotion/styled'

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  text-align: center;
`

const Code = styled.h1`
  border-right: 1px solid;
  display: inline-block;
  font-size: 24px;
  font-weight: 500;
  margin: 0px;
  margin-right: 20px;
  padding: 10px 23px 10px 0;
  vertical-align: top;
`

const TextWrapper = styled.div`
  display: inline-block;
  height: 49px;
  line-height: 49px;
  text-align: left;
  vertical-align: middle;
`

const Text = styled.h2`
  font-size: 14px;
  font-weight: normal;
  line-height: inherit;
  margin: 0px;
  padding: 0px;
`

export default function Error404() {
  return (
    <Container>
      <div>
        <Code>404</Code>
        <TextWrapper>
          <Text>This page could not be found.</Text>
        </TextWrapper>
      </div>
    </Container>
  )
}
