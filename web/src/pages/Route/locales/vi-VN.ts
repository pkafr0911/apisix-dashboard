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
export default {
  'page.route.button.returnList': 'Trở lại danh sách',
  'page.route.button.send': 'Gửi',
  'page.route.onlineDebug': 'Online Debug',
  'page.route.pluginTemplateConfig': 'Cấu hình bản mẫu tiện ích',

  'page.route.parameterPosition': 'Vị trí Parameter',
  'page.route.httpRequestHeader': 'HTTP Request Header',
  'page.route.requestParameter': 'Yêu cầu Parameter',
  'page.route.postRequestParameter': 'POST Yêu cầu Parameter',
  'page.route.builtinParameter': 'Built-in Parameter',
  'page.route.parameterName': 'Tên Parameter',
  'page.route.operationalCharacter': 'Operational Character',
  'page.route.equal': 'Bằng(==)',
  'page.route.unequal': 'Không bằng(~=)',
  'page.route.greaterThan': 'Nhiều hơn(>)',
  'page.route.lessThan': 'Ít hơn(<)',
  'page.route.regexMatch': 'Regex Match(~~)',
  'page.route.caseInsensitiveRegexMatch': 'Case insensitive regular match(~*)',
  'page.route.in': 'IN',
  'page.route.has': 'HAS',
  'page.route.reverse': 'Đảo ngược kết quả(!)',
  'page.route.rule': 'Rule',
  'page.route.httpHeaderName': 'HTTP Request Header Name',
  'page.route.service': 'Dịch vụ',
  'page.route.instructions': 'Hướng dẫn',
  'page.route.import': 'Đầu vào',
  'page.route.createRoute': 'Tạo Route',
  'page.route.editRoute': 'Cấu hình Route',

  'page.route.input.placeholder.parameterNameHttpHeader': 'Request header name, for example: HOST',
  'page.route.input.placeholder.parameterNameRequestParameter': 'Parameter name, for example: id',
  'page.route.input.placeholder.requestUrl': 'please input the valid request URL',
  'page.route.input.placeholder.paramKey': 'Param Key',
  'page.route.input.placeholder.paramValue': 'Param Value',
  'page.route.input.placeholder.paramType': 'Param Type',

  'page.route.form.itemRulesRequiredMessage.parameterName':
    'Chỉ hỗ trỡ chữ cái và số và chỉ có thể bắt đầu bằng chứ cái',
  'page.route.value': 'Parameter Value',
  'page.route.panelSection.title.advancedMatchRule': 'Advanced Routing Matching Conditions',

  'page.route.panelSection.title.nameDescription': 'Tên và Ghi chú',
  'page.route.form.itemRulesPatternMessage.apiNameRule': 'Độ dài lớn nhất là 100',

  'page.route.panelSection.title.requestConfigBasicDefine': 'Request Basic Define',
  'page.route.form.itemLabel.httpMethod': 'HTTP Method',
  'page.route.form.itemLabel.scheme': 'Scheme',
  'page.route.form.itemLabel.priority': 'Priority',
  'page.route.form.itemLabel.redirect': 'Redirect',
  'page.route.select.option.enableHttps': 'Enable HTTPS',
  'page.route.select.option.configCustom': 'Tùy chỉnh',
  'page.route.select.option.forbidden': 'Forbidden',
  'page.route.form.itemLabel.redirectCustom': 'Tùy chỉnh Redirect',
  'page.route.input.placeholder.redirectCustom': 'Ví dụ: /foo/index.html',
  'page.route.select.option.redirect301': '301(Permanent Redirect)',
  'page.route.select.option.redirect302': '302(Temporary Redirect)',
  'page.route.form.itemLabel.username': 'Username',
  'page.route.form.itemLabel.password': 'Password',
  'page.route.form.itemLabel.token': 'Token',
  'page.route.form.itemLabel.apikey': 'Apikey',

  'page.route.form.itemExtraMessage.domain':
    'Tên miền or IP, Hỗ trợ các loại tên miền, Ví dụ: *.test.com',
  'page.route.form.itemRulesPatternMessage.domain':
    'Chỉ chữ cái, số, -,_ và * được hỗ trợ, nhưng * cần ở vị trí đầu tiên.',
  'page.route.form.itemExtraMessage1.path':
    'HTTP Request path, Ví dụ: /foo/index.html, supports request path prefix /foo/* ; /* represents all paths',
  'page.route.form.itemRulesPatternMessage.remoteAddrs':
    'Hãy nhập địa chỉ IP hợp lệ, Ví dụ: 192.168.1.101, 192.168.1.0/24, ::1, fe80::1, fe80::1/64',
  'page.route.form.itemExtraMessage1.remoteAddrs':
    'Client IP, Ví dụ: 192.168.1.101, 192.168.1.0/24, ::1, fe80::1, fe80::1/64',

  'page.route.httpAction': 'Action',
  'page.route.httpOverrideOrCreate': 'Override/Create',
  'page.route.panelSection.title.httpOverrideRequestHeader': 'Override HTTP request header',
  'page.route.status': 'Status',
  'page.route.groupName': 'GroupName',
  'page.route.offline': 'Offline',
  'page.route.publish': 'Publish',
  'page.route.published': 'Published',
  'page.route.unpublished': 'UnPublished',

  'page.route.select.option.inputManually': 'Input Manually',
  'page.route.select.option.methodRewriteNone': 'Not modify',
  'page.route.form.itemLabel.domainNameOrIp': 'Domain Name/IP',
  'page.route.form.itemExtraMessage.domainNameOrIp':
    'When using Domain Name, it will analysis the local: /etc/resolv.conf by default',
  'page.route.portNumber': 'Port Number',
  'page.route.weight': 'Weight',
  'page.route.radio.staySame': 'Stay The Same',
  'page.route.form.itemLabel.newPath': 'New Path',
  'page.route.form.itemLabel.newHost': 'New Host',
  'page.route.form.itemLabel.regex': 'Regexp',
  'page.route.form.itemLabel.template': 'Template',
  'page.route.form.itemLabel.URIRewriteType': 'URI Override',
  'page.route.form.itemLabel.hostRewriteType': 'Host Override',
  'page.route.form.itemLabel.methodRewrite': 'Method Override',
  'page.route.form.itemLabel.redirectURI': 'Redirect URI',
  'page.route.input.placeholder.newPath': 'For example: /foo/bar/index.html',

  'page.route.steps.stepTitle.defineApiRequest': 'Define API Request',
  'page.route.steps.stepTitle.defineApiBackendServe': 'Define API Backend Server',

  'page.route.popconfirm.title.offline': 'Are you sure to offline this route?',
  'page.route.radio.static': 'Static',
  'page.route.radio.regex': 'Regex',
  'page.route.form.itemLabel.from': 'From',
  'page.route.form.itemHelp.status':
    'Whether a route can be used after it is created, the default value is false.',

  'page.route.host': 'Host',
  'page.route.path': 'Path',
  'page.route.remoteAddrs': 'Remote Addrs',
  'page.route.PanelSection.title.defineRequestParams': 'Define Request Parameters',
  'page.route.PanelSection.title.responseResult': 'Response Result',
  'page.route.debug.showResultAfterSendRequest': 'Hiện kết quả sau khi gửi yêu cầu',
  'page.route.TabPane.queryParams': 'Query Params',
  'page.route.TabPane.bodyParams': 'Body Params',
  'page.route.TabPane.headerParams': 'Header Params',
  'page.route.TabPane.authentication': 'Authentication',
  'page.route.TabPane.response': 'Response',
  'page.route.TabPane.header': 'Response Header',
  'page.route.debugWithoutAuth': 'This request does not use any authorization.',
  'page.route.button.exportOpenApi': 'Xuất OpenAPI',
  'page.route.exportRoutesTips': 'Please choose the type of file you want to export',
  'page.route.button.importOpenApi': 'Nhập OpenAPI',
  'page.route.button.selectFile': 'Hãy chọn thư mục',
  'page.route.list': 'Danh sách các Route',
  'page.route.panelSection.title.requestOverride': 'Yêu cầu Ghi đè',
  'page.route.form.itemLabel.headerRewrite': 'Header Override',
  'page.route.tooltip.pluginOrchOnlySupportChrome':
    'Tiện ích orchestration chỉ hỗ trợ trên Chrome.',
  'page.route.tooltip.pluginOrchWithoutProxyRewrite':
    'Plugin orchestration mode cannot be used when request override is configured in Step 1.',
  'page.route.tooltip.pluginOrchWithoutRedirect':
    'Plugin orchestration mode cannot be used when Redirect in Step 1 is selected to enable HTTPS.',

  'page.route.tabs.normalMode': 'Normal',
  'page.route.tabs.orchestration': 'Orchestration',

  'page.route.list.description':
    'Route là điểm đầu vào của mỗi yêu cầu, nơi mà quyết định sự liên kết giữa những quy tắc của yêu cầu khách hàng và  dịch vụ. Một route có thể liên kết với 1 dịch vụ (Service), đầu nguồn (Upstream), a service can correspond to a set of routes, and a route can correspond to an upstream object (a set of backend service nodes), so each request matching to a route will be proxied by the gateway to the route-bound upstream service.',

  'page.route.configuration.name.rules.required.description': 'Please enter the route name',
  'page.route.configuration.name.placeholder': 'Please enter the route name',
  'page.route.configuration.desc.tooltip': 'Please enter the description of the route',
  'page.route.configuration.publish.tooltip':
    'Used to control whether a route is published to the gateway immediately after it is created',
  'page.route.configuration.version.placeholder': 'Please enter the routing version number',
  'page.route.configuration.version.tooltip': 'Version number of the route, e.g. V1',
  'page.route.configuration.normal-labels.tooltip':
    'Add custom labels to routes that can be used for route grouping.',

  'page.route.configuration.path.rules.required.description':
    'Please enter a valid HTTP request path',
  'page.route.configuration.path.placeholder': 'Please enter the HTTP request path',
  'page.route.configuration.remote_addrs.placeholder': 'Please enter the client address',
  'page.route.configuration.host.placeholder': 'Please enter the HTTP request hostname',

  'page.route.service.none': 'None',

  'page.route.rule.create': 'Create Rule',
  'page.route.rule.edit': 'Configure Rule',

  'page.route.advanced-match.operator.sample.IN': 'Please enter an array, e.g ["1", "2"]',
  'page.route.advanced-match.operator.sample.~~': 'Please enter a regular expression, e.g [a-z]+',
  'page.route.fields.service_id.invalid': 'Please check the configuration of binding service',
  'page.route.fields.service_id.without-upstream':
    'If you do not bind the service, you must set the Upstream (Step 2)',
  'page.route.advanced-match.tooltip':
    'It supports route matching through request headers, request parameters and cookies, and can be applied to scenarios such as grayscale publishing and blue-green testing.',
  'page.route.advanced-match.message': 'Tips',
  'page.route.advanced-match.tips.requestParameter': 'Request Parameter：Query of the request URL',
  'page.route.advanced-match.tips.postRequestParameter':
    'POST Request Parameter：Only support x-www-form-urlencoded form',
  'page.route.advanced-match.tips.builtinParameter':
    'Build-in Parameter：Nginx internal parameters',

  'page.route.fields.custom.redirectOption.tooltip': 'This is related to redirect plugin',
  'page.route.fields.service_id.tooltip': 'Bind Service object to reuse their configuration.',

  'page.route.fields.vars.invalid': 'Please check the advanced match condition configuration',
  'page.route.fields.vars.in.invalid':
    'When using the IN operator, enter the parameter values in array format.',
};
