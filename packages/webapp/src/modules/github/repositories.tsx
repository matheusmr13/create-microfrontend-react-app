import React, { useState } from 'react';

import { List, Avatar, Input, Button } from 'antd';
import { MessageOutlined, StarOutlined, GithubOutlined, SearchOutlined } from '@ant-design/icons';

import { useGithubApiRequest } from 'base/hooks/request';
import { Link } from 'react-router-dom';
import Page from 'base/components/page';
import useQuery from 'base/hooks/query-param';
import firebase from 'modules/account/firebase';

const IconText: React.FC<{
  icon: any;
  text: any;
}> = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const Repos: React.FC<{}> = () => {
  const [searchText, setSearchText] = useState('');
  const [{ data: repos, loading }] = useGithubApiRequest('/user/repos?type=owner');

  const queryParam = useQuery();

  const getUrlToImport = (repo: any) => {
    let url = `./github/import/${repo.full_name}`;
    if (queryParam.get('applicationId')) url += `?applicationId=${queryParam.get('applicationId')}`;
    return url;
  };

  return (
    <Page title="Github Repositories" rootPage>
      <Input
        size="large"
        placeholder="Search"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <List
        itemLayout="vertical"
        size="large"
        loading={loading}
        dataSource={(repos || []).filter((repo: any) => repo.name.indexOf(searchText) > -1)}
        renderItem={(repo: any) => (
          <List.Item
            key={repo.id}
            actions={[
              <IconText icon={StarOutlined} text={repo.stargazers_count} key="list-vertical-star-o" />,
              <IconText icon={MessageOutlined} text={repo.open_issues} key="list-vertical-message" />,
            ]}
            extra={<Link to={getUrlToImport(repo)}>Import</Link>}
          >
            <List.Item.Meta
              avatar={<Avatar icon={<GithubOutlined />} />}
              title={repo.name}
              description={repo.description}
            />
          </List.Item>
        )}
      />
    </Page>
  );
};

export default Repos;
