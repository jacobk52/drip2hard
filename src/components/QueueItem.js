import React, { useContext } from 'react';
import Level from 'react-bulma-components/lib/components/level';
import Heading from 'react-bulma-components/lib/components/heading';
import { FirestoreContext } from '../utils/context';
import Box from 'react-bulma-components/lib/components/box';



const QueueItem = props => {
  const { user, visits, profiles, clinic } = useContext(FirestoreContext);


  return (
    <Box className="level-hover">
      <Level>
        <Level.Side align="left">
          <Level.Item>
            <Heading size={5} subtitle>{props.data.user.nickname}</Heading>
          </Level.Item>
        </Level.Side>

        <Level.Side align="center">
          <Level.Item>
            <Heading size={6} subtitle>{props.data.reason}</Heading>
          </Level.Item>
        </Level.Side>

        <Level.Side align="right">
          <Level.Item>
            <Heading size={5} subtitle>{props.data.time}</Heading>
          </Level.Item>
        </Level.Side>
      </Level>
    </Box>

  )
};

export default QueueItem