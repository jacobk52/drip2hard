import React, { useContext } from 'react';
import Section from 'react-bulma-components/lib/components/section'
import { FirestoreContext } from '../utils/context'
import { useTime } from '../utils/hooks'
import QueueItem from './QueueItem'
import Content from 'react-bulma-components/lib/components/content';
import Level from 'react-bulma-components/lib/components/level';
import Box from 'react-bulma-components/lib/components/box';

const Queue = () => {
  const { visits, profiles, clinic } = useContext(FirestoreContext);
  const { time } = useTime();
  const visitsArr = visits && Object.values(visits)

  const queueItems = (visitsArr || [])
    .filter(visit => visit.clinic_id === clinic.id)
    .map(visit => ({
      ...visit,
      profile: { ...profiles[visit.user_id] }
    }))
    .map((visit, i) => (
      <QueueItem visit={visit} key={i} />
    ));

  const formattedTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

  const nextVisit = clinic.next_visit_id && visits && visits[clinic.next_visit_id];
  const nextProfile = nextVisit && nextVisit.status === 'new' && profiles && profiles[nextVisit.user_id];

  return (
    <>
      <Section>
        <Box>
          <Level>
            <Level.Item className="has-text-centered">
              <div>
                <p className="heading">Current Time</p>
                <p className="title">{formattedTime}</p>
              </div>
            </Level.Item>

            <Level.Item className="has-text-centered">
              <div>
                <p className="heading">Next Up</p>
                <p className="title">{nextProfile && nextProfile.nickname}</p>
              </div>
            </Level.Item>
          </Level>
        </Box>
      </Section>

      <Section>
        <Content>
          <h2>Upcoming visits</h2>
          {queueItems && queueItems.filter(item => item.props.visit.status === 'new' || item.props.visit.status === 'in_progress')}
        </Content>
      </Section>

      <Section>
        <Content>
          <h2>Completed Visits</h2>
          {queueItems && queueItems.filter(item => item.props.visit.status === 'done')}
        </Content>
      </Section>
    </>
  )
};

export default Queue;