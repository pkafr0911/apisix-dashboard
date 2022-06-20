import React, { useState, useEffect, useContext, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  Switch,
  Button,
  Card,
  Tooltip,
  Form,
  Input,
  Row,
  Col,
  notification,
  Select,
  Tag,
  Radio,
  Typography,
  Table,
  Popconfirm,
  InputNumber,
} from 'antd';
import type { FormInstance } from 'antd/lib/form';
import ActionBar from '@/components/ActionBar';
import PanelSection from '@/components/PanelSection';
import { getUrlQuery } from '@/helpers';
import { history, useIntl } from 'umi';

import { QuestionCircleOutlined } from '@ant-design/icons';

const FORM_LAYOUT = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 22,
  },
};

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<null>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!;
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  name: string;
  age: string;
  address: string;
}

interface EditableTableState {
  dataSource: DataType[];
  count: number;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

class EditableTable extends React.Component<EditableTableProps, EditableTableState> {
  columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[];

  constructor(props: EditableTableProps) {
    super(props);

    this.columns = [
      {
        title: 'Common name',
        dataIndex: 'name',
        width: '30%',
        editable: true,
      },
      {
        title: 'exp.Date',
        dataIndex: 'age',
      },
      {
        title: 'SHA-1 Fingerprint',
        dataIndex: 'address',
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        render: (_, record: { key: React.Key }) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [
        {
          key: '0',
          name: 'GlobalSign RSA OV SSL CA 2018',
          age: '30',
          address: 'dfe83023062b997682708b4eab8e81',
        },
        {
          key: '1',
          name: 'Edward King 1',
          age: '30',
          address: 'London, Park Lane no. 1',
        },
      ],
      count: 2,
    };
  }

  handleDelete = (key: React.Key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter((item) => item.key !== key) });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData: DataType = {
      key: count,
      name: `GlobalSign RSA OV SSL CA 2018 ${count}`,
      age: '30',
      address: `dfe83023062b997682708b4eab8e81 ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = (row: DataType) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: DataType) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16, marginTop: 20 }}>
          Add Certificate
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
        />
      </div>
    );
  }
}

const Dashboard: React.FC = () => {
  const { formatMessage } = useIntl();
  const [form] = Form.useForm();
  const isSuperAdmin = true;
  const isWorkspace = false;
  const canFetchGrafana = (isSuperAdmin && !isWorkspace) || isWorkspace;
  const [visible, setVisible] = useState(false);

  const NormalLabelComponent = () => {
    const field = 'custom_normal_labels';

    return (
      <React.Fragment>
        <Form.Item
          label={formatMessage({ id: 'component.global.labels' })}
          name={field}
          tooltip={formatMessage({ id: 'page.route.configuration.normal-labels.tooltip' })}
        >
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="--"
            open={false}
            bordered={false}
            tagRender={(props) => {
              const { value, closable, onClose } = props;
              return (
                <Col span={3}>
                  <Tag closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
                    {value}
                  </Tag>
                </Col>
              );
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="dashed" disabled={false} onClick={() => setVisible(true)}>
            {formatMessage({ id: 'component.global.manage' })}
          </Button>
        </Form.Item>
        {visible && <Form.Item shouldUpdate noStyle></Form.Item>}
      </React.Fragment>
    );
  };

  const TrueClientIPHeaderName = () => {
    return (
      <Form.Item
        label="True Client IP Header Name"
        tooltip={formatMessage({ id: 'page.route.configuration.version.tooltip' })}
      >
        <Row>
          <Col span={10}>
            <Form.Item noStyle name="">
              <Input disabled={false} />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
    );
  };

  const OriginType: React.FC = () => (
    <Form.Item
      label="Origin Type"
      required
      tooltip={formatMessage({ id: 'page.route.form.itemRulesPatternMessage.apiNameRule' })}
    >
      <Row>
        <Col span={10}>
          <Form.Item
            noStyle
            name="originType"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'page.route.configuration.name.rules.required.description',
                }),
              },
              {
                pattern: new RegExp(/^.{0,100}$/, 'g'),
                message: formatMessage({
                  id: 'page.route.form.itemRulesPatternMessage.apiNameRule',
                }),
              },
            ]}
          >
            <Select placeholder="Origin Type" disabled={false} />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );

  const OriginServerHostName: React.FC = () => {
    return (
      <Form.Item label="Origin Server Host Name:">
        <Row>
          <Col span={10}>
            <Form.Item noStyle name="">
              <Input disabled={false} />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
    );

    return null;
  };

  const ForwardHostHeader: React.FC = () => {
    return (
      <Form.Item
        label="Forward Host Header"
        tooltip={formatMessage({ id: 'page.route.form.itemRulesPatternMessage.apiNameRule' })}
      >
        <Row>
          <Col span={10}>
            <Form.Item noStyle name="originType">
              <Select placeholder="Forward Host Header" disabled={false} />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
    );

    return null;
  };

  const Description: React.FC = () => (
    <Form.Item label={formatMessage({ id: 'component.global.description' })}>
      <Row>
        <Col span={10}>
          <Form.Item noStyle name="desc">
            <Input.TextArea
              placeholder={formatMessage({ id: 'component.global.input.placeholder.description' })}
              disabled={false}
              showCount
              maxLength={256}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );

  const SendTrueClientIPHeader: React.FC = () => (
    <Form.Item
      label="Send True Client IPH Header"
      tooltip={formatMessage({ id: 'page.route.configuration.publish.tooltip' })}
    >
      <Row>
        <Col>
          <Form.Item noStyle name="status" valuePropName="checked">
            <Switch disabled={false} />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );

  const AlowClientToSetTrueClinetIPHeader: React.FC = () => (
    <Form.Item
      label="Alow Client To Set True Clinet IP Header"
      tooltip={formatMessage({ id: 'page.route.configuration.publish.tooltip' })}
    >
      <Form.Item noStyle name="status" valuePropName="checked">
        <Switch disabled={false} />
      </Form.Item>
    </Form.Item>
  );

  const SuportsGzipCompresstion: React.FC = () => (
    <Form.Item label="Suports Gzip Compress">
      <Row>
        <Col>
          <Form.Item noStyle valuePropName="alow" name="enable_websocket">
            <Switch disabled={false} />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );

  const Redirect: React.FC = () => {
    const list = [
      {
        value: 'forceHttps',
        label: formatMessage({ id: 'page.route.select.option.enableHttps' }),
      },
      {
        value: 'customRedirect',
        label: formatMessage({ id: 'page.route.select.option.configCustom' }),
      },
      {
        value: 'disabled',
        label: formatMessage({ id: 'page.route.select.option.forbidden' }),
      },
    ];

    return (
      <Form.Item
        label={formatMessage({ id: 'page.route.form.itemLabel.redirect' })}
        tooltip={formatMessage({ id: 'page.route.fields.custom.redirectOption.tooltip' })}
      >
        <Row>
          <Col span={5}>
            <Form.Item name="redirectOption" noStyle>
              <Select disabled={false} data-cy="route-redirect">
                {list.map((item) => (
                  <Select.Option value={item.value} key={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
    );
  };
  const VerificationSettings: React.FC = () => (
    <Form.Item
      label="Verification Settings"
      required
      tooltip={formatMessage({ id: 'page.route.form.itemRulesPatternMessage.apiNameRule' })}
    >
      <Row>
        <Col span={10}>
          <Form.Item noStyle name="verificationSettings">
            <Select placeholder="Verification Settings" disabled={false} />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );

  const UseSNITLSExtention: React.FC = () => (
    <Form.Item label="Use SNI TLS Extention">
      <Row>
        <Col>
          <Form.Item noStyle valuePropName="use" name="enable_websocket">
            <Switch disabled={false} />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );

  const MatchCNSANTo: React.FC = () => {
    const list = [
      {
        value: 'forceHttps',
        label: 'Origin Hostname',
      },
      {
        value: 'customRedirect',
        label: 'Forward Host Header',
      },
    ];

    return (
      <Form.Item
        label="Match CN/SAN To"
        tooltip={formatMessage({ id: 'page.route.fields.custom.redirectOption.tooltip' })}
      >
        <Row>
          <Col span={10}>
            <Form.Item name="matchCNSANTo" noStyle>
              <Select mode="tags" disabled={false} data-cy="route-redirect">
                {list.map((item) => (
                  <Select.Option value={item.value} key={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
    );
  };

  const Trust: React.FC = () => (
    <Form.Item
      label="Trust"
      required
      tooltip={formatMessage({ id: 'page.route.form.itemRulesPatternMessage.apiNameRule' })}
    >
      <Row>
        <Col span={10}>
          <Form.Item noStyle name="trust">
            <Select placeholder="Trust" disabled={false} />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );

  const AkamaiManaged: React.FC = () => (
    <Form.Item label="Akamai-managed">
      <Row>
        <Col span={16}>
          <Form.Item
            name="selectedAkamaiCertificated"
            label="Akamai Certificate Store"
            labelCol={{ span: 8 }}
          >
            <Switch defaultChecked />
            <Typography.Link
              style={{ marginLeft: '24px', color: '#1890ff' }}
              href="https://ant.design"
              target="_blank"
            >
              View CA Set
            </Typography.Link>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={16}>
          <Form.Item
            name="selected3Partytificated"
            label="Third Party Certificate Store "
            labelCol={{ span: 8 }}
          >
            <Switch defaultChecked />
            <Typography.Link
              style={{ marginLeft: '24px', color: '#1890ff' }}
              href="https://ant.design"
              target="_blank"
            >
              View CA Set
            </Typography.Link>
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );

  const HTTPPort: React.FC = () => (
    <Form.Item
      label="HTTP Port"
      required
      tooltip={formatMessage({ id: 'page.route.form.itemRulesPatternMessage.apiNameRule' })}
    >
      <Row>
        <Col span={10}>
          <Form.Item noStyle name="HTTPPort">
            <InputNumber min={1} defaultValue={80} disabled={false} />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );

  const HTTPSPort: React.FC = () => (
    <Form.Item
      label="HTTPS Port"
      required
      tooltip={formatMessage({ id: 'page.route.form.itemRulesPatternMessage.apiNameRule' })}
    >
      <Row>
        <Col span={10}>
          <Form.Item noStyle name="HTTPSPort">
            <InputNumber min={1} defaultValue={443} disabled={false} />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );

  const CustomRedirect: React.FC = () => (
    <Form.Item
      noStyle
      shouldUpdate={(prev, next) => {
        if (prev.redirectOption !== next.redirectOption) {
        }
        return prev.redirectOption !== next.redirectOption;
      }}
    >
      {() => {
        if (form.getFieldValue('redirectOption') === 'customRedirect') {
          return (
            <Form.Item
              label={formatMessage({ id: 'page.route.form.itemLabel.redirectCustom' })}
              required
              style={{ marginBottom: 0 }}
            >
              <Row gutter={10}>
                <Col span={5}>
                  <Form.Item
                    name="redirectURI"
                    rules={[
                      {
                        required: true,
                        message: `${formatMessage({
                          id: 'component.global.pleaseEnter',
                        })}${formatMessage({
                          id: 'page.route.form.itemLabel.redirectURI',
                        })}`,
                      },
                    ]}
                  >
                    <Input
                      placeholder={formatMessage({
                        id: 'page.route.input.placeholder.redirectCustom',
                      })}
                      disabled={false}
                    />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item name="ret_code" rules={[{ required: false }]}>
                    <Select disabled={false} data-cy="redirect_code">
                      <Select.Option value={301}>
                        {formatMessage({ id: 'page.route.select.option.redirect301' })}
                      </Select.Option>
                      <Select.Option value={302}>
                        {formatMessage({ id: 'page.route.select.option.redirect302' })}
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          );
        }
        return null;
      }}
    </Form.Item>
  );

  const ServiceSelector: React.FC = () => (
    <React.Fragment>
      <Form.Item
        label={formatMessage({ id: 'page.route.service' })}
        tooltip={formatMessage({ id: 'page.route.fields.service_id.tooltip' })}
      >
        <Row>
          <Col span={5}>
            <Form.Item noStyle name="service_id">
              <Select
                showSearch
                disabled={false}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {/* TODO: value === '' means  no service_id select, need to find a better way */}
                <Select.Option value="" key={Math.random().toString(36).substring(7)}>
                  {formatMessage({ id: 'page.route.service.none' })}
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item noStyle>{() => null}</Form.Item>
    </React.Fragment>
  );

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
          Property Manager Editor
          <Tooltip title={formatMessage({ id: 'page.dashboard.tip' })}>
            <QuestionCircleOutlined />
          </Tooltip>
        </>
      }
    >
      <Card>
        <Form>
          <PanelSection title="Property Version Information"></PanelSection>

          <Form.Item>
            <Input />
          </Form.Item>
        </Form>

        <Form labelCol={{ span: 5 }}>
          <Form.Item label="Production status:" name="ProductionStatus" extra="">
            INACTIVE
          </Form.Item>
        </Form>
        <Form labelCol={{ span: 5 }}>
          <Form.Item label="Staging Status:" name="StagingStatus" extra="">
            INACTIVE
          </Form.Item>
        </Form>
        <Form labelCol={{ span: 5 }}>
          <Form.Item label="Security Option:" name="SecurityOption" extra="">
            <Radio.Group name="radiogroup" defaultValue={1}>
              <Radio value={1}>Standand TLS ready</Radio>
              <Radio value={2}>Enhanced TLS</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>

        <Form labelCol={{ span: 5 }}>
          <Form.Item label={formatMessage({ id: 'component.global.description' })}>
            <Row>
              <Col span={11}>
                =
                <Form.Item noStyle name="desc">
                  <Input.TextArea
                    placeholder={formatMessage({
                      id: 'component.global.input.placeholder.description',
                    })}
                    disabled={false}
                    showCount
                    maxLength={256}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <Form {...FORM_LAYOUT}>
          <PanelSection title="Property congiguration settings">
            <OriginType />
            <OriginServerHostName />
            <ForwardHostHeader />
            <SuportsGzipCompresstion />
            <SendTrueClientIPHeader />
            <TrueClientIPHeaderName />
            <AlowClientToSetTrueClinetIPHeader />
            Origin S SL Certificate Verification
            <VerificationSettings />
            <UseSNITLSExtention />
            <MatchCNSANTo />
            <Trust />
            <AkamaiManaged />
            Custom Certificate Authority Set
            <EditableTable />
            Specific Certificate (pinning)
            <EditableTable />
            Port
            <HTTPPort />
            <HTTPSPort />
            <NormalLabelComponent />
            <Description />
            <Redirect />
            <CustomRedirect />
            <ServiceSelector />
          </PanelSection>
        </Form>
      </Card>

      <ActionBar step={1} lastStep={1} onChange={onSubmit} />
    </PageHeaderWrapper>
  );
};

export default Dashboard;
