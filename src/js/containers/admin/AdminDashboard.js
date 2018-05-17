import React from 'react';
import {
  Page,
  Dashboard,
  DashboardItem,
  TableContainer,
  Section,
} from 'blakit-react-material-components';

const AdminDashboard = () => {
  const getRowActions = () => {
    const actions = [];
    actions.push(
      {
        label: 'Редактировать',
        link: () => 'edit',
      },
      {
        label: 'Типы билетов',
        link: () => 'type',
      },
      {
        label: 'Регистрации',
        link: () => 'red',
      },
      {
        label: 'Удалить событие',
      },
    );
    return actions;
  };

  const renderStatus = (status) => {
    switch (status) {
      case 'LIVE':
        return 'Разрешен вход';
      case 'FUTURE':
        return 'Разрешена регастрация';
      case 'FINISHED':
        return 'Завершено';
      default:
        return null;
    }
  };

  return (
    <Page
      title="Dashboard"
      breadcrumbs={[
        {
          to: '/admin',
          text: 'Home',
        },
        {
          to: '/admin/projects',
          text: 'Projects',
        },
        'Dashboard',
      ]}
    >
      <Section>
        <Dashboard size="col-md-3 col-sm-6 col-xs-12">
          <DashboardItem
            counterLoading={false}
            loading={false}
            title="Проекты"
            counter={10}
            to="/admin/projects"
          />

          <DashboardItem
            counterLoading={false}
            loading={false}
            title="Категории"
            counter={10}
            to="/admin/categories"
          />

          <DashboardItem loading={false}>
            <h2>Text</h2>
            <p>Lorem ipsum dolor sit amet.</p>
          </DashboardItem>
        </Dashboard>
      </Section>

      <Section title="Таблица">
        <TableContainer
          numbered
          columns={[
            {
              header: 'Название',
              field: 'name',
            },
            {
              header: 'ID в Mailchimp',
              field: 'mailchimp_list_id',
            },
            {
              header: 'Дата',
              field: 'date',
            },
            {
              header: 'Статус',
              view: ({ model }) => renderStatus(model.status),
            },
            {
              header: '',
              field: '',
            },
          ]}
          models={[{
            id: 1,
            uuid: '1e61c76f-8b14-4c00-8fc0-6025120c2afe',
            name: 'CryptoConference 2017',
            date: '2018-03-15',
            website: 'http://cryptoconference.by',
            status: 'LIVE',
            phone_confirmation: 1,
            mailchimp_list_id: 'af2ebd2c0a',
            created_at: 1517331757,
          }, {
            id: 156,
            uuid: 'd7e4d11a-d27c-428e-bf98-d54c4f1e70c8',
            name: 'Minsk Legal Forum 2018',
            date: '2018-10-18',
            website: 'http://minsklegal.by/',
            status: 'FUTURE',
            phone_confirmation: 0,
            mailchimp_list_id: '',
            created_at: 1522417907,
          }]}
          actionsGenerator={model => getRowActions(model)}
        />
      </Section>
    </Page>
  );
};

AdminDashboard.propTypes = {};
AdminDashboard.defaultProps = {};

export default AdminDashboard;
