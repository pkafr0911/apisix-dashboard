/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Empty, Button, Card, Tooltip, Form, Input, Row, Col, notification } from 'antd';
import ActionBar from '@/components/ActionBar';
import { getUrlQuery } from '@/helpers';
import { history, useIntl } from 'umi';

import { getGrafanaURL } from './service';
import { updateMonitorURL } from '../Setting/service';
import { QuestionCircleOutlined } from '@ant-design/icons';

const Dashboard: React.FC = () => {
  const [grafanaURL, setGrafanaURL] = useState<string | undefined>();
  const { formatMessage } = useIntl();
  const [form] = Form.useForm();
  const isSuperAdmin = true;
  const isWorkspace = false;
  const canFetchGrafana = (isSuperAdmin && !isWorkspace) || isWorkspace;

  useEffect(() => {
    getGrafanaURL().then((url) => {
      setGrafanaURL(url);
    });
    if (!canFetchGrafana) {
      return;
    }
    getGrafanaURL().then((url) => {
      form.setFieldsValue({
        grafanaURL: url,
      });
    });
  }, [canFetchGrafana]);

  const onSubmit = () => {
    form.validateFields().then((value) => {
      Promise.all([
        new Promise((resolve) => {
          if (canFetchGrafana) {
            updateMonitorURL(value.grafanaURL).then(resolve);
          }
          // resolve();
        }),
      ]).then(() => {
        notification.success({
          message: formatMessage({
            id: 'page.setting.notification.update.configuration.successfully',
          }),
        });
        setTimeout(() => {
          const redirect = getUrlQuery('redirect');
          const currentHost = window.location.host;
          if (redirect) {
            const redirectUrl = decodeURIComponent(redirect);
            const pathArray = redirectUrl.split('/');
            const redirectHost = pathArray[2];
            if (currentHost === redirectHost) {
              let path = '';
              for (let i = 3; i < pathArray.length; i += 1) {
                path += '/';
                path += pathArray[i];
              }
              history.push(path);
            }
          } else {
            history.push('/');
          }
        }, 500);
      });
    });
  };

  return (
    <PageHeaderWrapper
      title={
        <>
          {formatMessage({ id: 'menu.dashboard' })}&nbsp;
          <Tooltip title={formatMessage({ id: 'page.dashboard.tip' })}>
            <QuestionCircleOutlined />
          </Tooltip>
        </>
      }
    >
      <PageHeaderWrapper
        title={
          <>
            {formatMessage({ id: 'menu.dashboard' })}&nbsp;
            <Tooltip title={formatMessage({ id: 'page.dashboard.tip' })}>
              <QuestionCircleOutlined />
            </Tooltip>
          </>
        }
      ></PageHeaderWrapper>
      <Card>
        {!grafanaURL && (
          <Empty
            image="empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={
              <span>
                {formatMessage({ id: 'page.dashboard.empty.description.grafanaNotConfig' })}
              </span>
            }
          >
            <Button
              type="primary"
              onClick={() => {
                history.replace({});
              }}
            >
              {formatMessage({ id: 'page.dashboard.button.grafanaConfig' })}
            </Button>
          </Empty>
        )}
        {grafanaURL && (
          <div>
            <iframe title="dashboard" src={grafanaURL} width="100%" height="860" frameBorder="0" />
          </div>
        )}
      </Card>
      <Card>
        <Row>
          <Col span={10}>
            <Form form={form} labelCol={{ span: 7 }}>
              {canFetchGrafana && (
                <Form.Item
                  label={formatMessage({ id: 'PageURL' })}
                  name="PageURL"
                  extra={formatMessage({
                    id: 'PageURL.inputHelpMessage',
                  })}
                  rules={[
                    {
                      pattern: new RegExp(/^https?:\/\//),
                      message: formatMessage({
                        id: 'page.setting.form.item.grafanaURL.inputErrorMessage',
                      }),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}
            </Form>
          </Col>
        </Row>
      </Card>
      <ActionBar step={1} lastStep={1} onChange={onSubmit} />
    </PageHeaderWrapper>
  );
};

export default Dashboard;
