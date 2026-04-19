// 国内DNS服务器
const domesticNameservers = [
  "https://dns.alidns.com/dns-query", // 阿里DoH
  "https://doh.pub/dns-query" // 腾讯DoH，因腾讯云即将关闭免费版IP访问，故用域名
];
// 国外DNS服务器
const foreignNameservers = [
  "https://cloudflare-dns.com/dns-query", // CloudflareDNS
  "https://8.8.4.4/dns-query#ecs=1.1.1.1/24&ecs-override=true", // GoogleDNS
  "https://208.67.222.222/dns-query#ecs=1.1.1.1/24&ecs-override=true", // OpenDNS
  "https://dns.quad9.net/dns-query" //Quad9DNS
];
// DNS配置
const dnsConfig = {
  "enable": true,
  "listen": "0.0.0.0:1053",
  // "ipv6": true,
  "prefer-h3": false,
  "respect-rules": true,
  "use-system-hosts": false,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    // 本地主机/设备
    "+.lan",
    "+.local",
    // // Windows网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    // QQ快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    // 微信快速登录检测失败
    "localhost.work.weixin.qq.com"
  ],
  "default-nameserver": ["223.5.5.5", "119.29.29.29"],
  "nameserver": [...foreignNameservers],
  "proxy-server-nameserver": [...domesticNameservers],
  "direct-nameserver": [...domesticNameservers],
  "direct-nameserver-follow-policy": true,
  "nameserver-policy": {
    "geosite:cn": domesticNameservers
  }
};
// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400
};
// 规则集配置
const ruleProviders = {
  "reject": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
    "path": "./ruleset/loyalsoldier/reject.yaml"
  },
  "icloud": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
    "path": "./ruleset/loyalsoldier/icloud.yaml"
  },
  "apple": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
    "path": "./ruleset/loyalsoldier/apple.yaml"
  },
  "google": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt",
    "path": "./ruleset/loyalsoldier/google.yaml"
  },
  "proxy": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
    "path": "./ruleset/loyalsoldier/proxy.yaml"
  },
  "direct": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
    "path": "./ruleset/loyalsoldier/direct.yaml"
  },
  "private": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
    "path": "./ruleset/loyalsoldier/private.yaml"
  },
  "gfw": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
    "path": "./ruleset/loyalsoldier/gfw.yaml"
  },
  "tld-not-cn": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
    "path": "./ruleset/loyalsoldier/tld-not-cn.yaml"
  },
  "telegramcidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
    "path": "./ruleset/loyalsoldier/telegramcidr.yaml"
  },
  "cncidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
    "path": "./ruleset/loyalsoldier/cncidr.yaml"
  },
  "lancidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
    "path": "./ruleset/loyalsoldier/lancidr.yaml"
  },
  "applications": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
    "path": "./ruleset/loyalsoldier/applications.yaml"
  },
  "openai": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/openai.yaml",
    "path": "./ruleset/MetaCubeX/openai.yaml"
  },
  "bybit": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/bybit.yaml",
    "path": "./ruleset/MetaCubeX/bybit.yaml"
  },
  "pikpak": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/pikpak.yaml",
    "path": "./ruleset/MetaCubeX/pikpak.yaml"
  },
  "anthropic": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/anthropic.yaml",
    "path": "./ruleset/MetaCubeX/anthropic.yaml"
  },
  "google-gemini": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/google-gemini.yaml",
    "path": "./ruleset/MetaCubeX/google-gemini.yaml"
  },
  "xai": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/xai.yaml",
    "path": "./ruleset/MetaCubeX/xai.yaml"
  },
  "perplexity": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/perplexity.yaml",
    "path": "./ruleset/MetaCubeX/perplexity.yaml"
  },
  "microsoft": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/microsoft.yaml",
    "path": "./ruleset/MetaCubeX/microsoft.yaml"
  },
};
// 规则
const rules = [
  // 额外自定义规则       //在此添加你想要的规则
  "PROCESS-NAME,steam.exe,🐬 自定义直连",
  "DOMAIN-SUFFIX,immersivetranslate.com,🐳 自定义代理",
  // "DOMAIN-SUFFIX,bing.com,🐳 自定义代理",
  // 自定义规则
  "DOMAIN-SUFFIX,googleapis.cn,🔰 模式选择", // Google服务
  "DOMAIN-SUFFIX,gstatic.com,🔰 模式选择", // Google静态资源
  "DOMAIN-SUFFIX,xn--ngstr-lra8j.com,🔰 模式选择", // Google Play下载服务
  "DOMAIN-SUFFIX,github.io,🔰 模式选择", // Github Pages
  "DOMAIN,v2rayse.com,🔰 模式选择", // V2rayse节点工具
  // blackmatrix7 规则集

  // MetaCubeX 规则集
  "RULE-SET,openai,💸 AI",
  "RULE-SET,pikpak,🅿️ PikPak",
  "RULE-SET,bybit,🪙 Bybit",
  "RULE-SET,anthropic,💵 Claude",
  "RULE-SET,google-gemini,💸 AI",
  "RULE-SET,xai,💸 AI",
  "RULE-SET,perplexity,💸 AI",
  // Loyalsoldier 规则集
  "RULE-SET,applications,🔗 全局直连",
  "RULE-SET,private,🔗 全局直连",
  "RULE-SET,reject,🥰 广告过滤",
  "RULE-SET,microsoft,Ⓜ️ 微软服务",
  "RULE-SET,icloud,🍎 苹果服务",
  "RULE-SET,apple,🍎 苹果服务",
  "RULE-SET,google,📢 谷歌服务",
  "RULE-SET,proxy,🔰 模式选择",
  "RULE-SET,gfw,🔰 模式选择",
  "RULE-SET,tld-not-cn,🔰 模式选择",
  "RULE-SET,direct,🔗 全局直连",
  "RULE-SET,lancidr,🔗 全局直连,no-resolve",
  "RULE-SET,cncidr,🔗 全局直连,no-resolve",
  "RULE-SET,telegramcidr,📲 电报消息,no-resolve",
  // 其他规则
  "GEOIP,LAN,🔗 全局直连,no-resolve",
  "GEOIP,CN,🔗 全局直连,no-resolve",
  "MATCH,🐟 漏网之鱼"
];
// 代理组通用配置
const groupBaseOption = {
  "interval": 0,
  "timeout": 3000,
  "url": "https://www.google.com/generate_204",
  "lazy": true,
  "max-failed-times": 3,
  "hidden": false
};

const landingNodeProxies = [
  {
    "name": "新加坡1", // 给你的落地节点起个名字
    "server": "sg-fdc.aikunapp.com", // 替换成你的落地节点 IP 或域名
    "port": 6001, // 替换成你的落地节点端口
    "type": "anytls",
    "username": "", // 替换成你的用户名
    "password": "517eacec-b279-4b5c-9f0a-ee5ba6d66620", // 替换成你的密码
    "tls": false,
    "skip-cert-verify": true,
    "udp": true,
    "dialer-proxy": "⚙️ 节点选择"
  },
  // 如果有更多落地节点，在这里继续添加
  // {
  //   "name": "landing-node-2",
  //   ...
  //   "dialer-proxy": "⚙️ 节点选择"
  // }
];

const landingNodeNames = landingNodeProxies.map(p => p.name);

const proxyGroupsConfig = [
  {
    ...groupBaseOption,
    "name": "🔰 模式选择",
    "type": "select",
    "proxies": [
      "⚙️ 节点选择",
      "🕊️ 落地节点",
      "🔗 全局直连"
    ]
  },
  {
    ...groupBaseOption,
    "name": "⚙️ 节点选择",
    "type": "select",
    "proxies": ["♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
  },
  {
    ...groupBaseOption,
    "name": "🕊️ 落地节点",
    "type": "select",
    "proxies": [...landingNodeNames],
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/openwrt.svg"
  },
  {
    ...groupBaseOption,
    "name": "♻️ 延迟选优",
    "type": "url-test",
    "tolerance": 50,
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg"
  },
  {
    ...groupBaseOption,
    "name": "🚑 故障转移",
    "type": "fallback",
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg"
  },
  {
    ...groupBaseOption,
    "name": "⚖️ 负载均衡(散列)",
    "type": "load-balance",
    "strategy": "consistent-hashing",
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg"
  },
  {
    ...groupBaseOption,
    "name": "☁️ 负载均衡(轮询)",
    "type": "load-balance",
    "strategy": "round-robin",
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg"
  },
  {
    ...groupBaseOption,
    "name": "🌍 国外媒体",
    "type": "select",
    "proxies": ["🔰 模式选择", "⚙️ 节点选择", "🕊️ 落地节点", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)", "🔗 全局直连"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg"
  },
  {
    ...groupBaseOption,
    "name": "💸 AI",
    "type": "select",
    "proxies": ["🔰 模式选择", "⚙️ 节点选择", "🕊️ 落地节点", "🔗 全局直连", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)"],
    "include-all": true,
    "exclude-filter": "(?i)港|hk|hongkong|hong kong|俄|ru|russia|澳|macao",
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg"
  },
  {
    ...groupBaseOption,
    "name": "💵 Claude",
    "type": "select",
    "proxies": ["🔰 模式选择", "⚙️ 节点选择", "🕊️ 落地节点", "🔗 全局直连", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/claude.svg"
  },
  {
    ...groupBaseOption,
    "name": "🪙 Bybit",
    "type": "select",
    "proxies": ["🔰 模式选择", "⚙️ 节点选择", "🕊️ 落地节点", "🔗 全局直连", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
  },
  {
    ...groupBaseOption,
    "name": "🅿️ PikPak",
    "type": "select",
    "proxies": ["🔰 模式选择", "⚙️ 节点选择", "🕊️ 落地节点", "🔗 全局直连", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
  },
  {
    ...groupBaseOption,
    "name": "📲 电报消息",
    "type": "select",
    "proxies": ["🔰 模式选择", "⚙️ 节点选择", "🕊️ 落地节点", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)", "🔗 全局直连"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg"
  },
  {
    ...groupBaseOption,
    "name": "📢 谷歌服务",
    "type": "select",
    "proxies": ["🔰 模式选择", "⚙️ 节点选择", "🕊️ 落地节点", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)", "🔗 全局直连"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
  },
  {
    ...groupBaseOption,
    "name": "🍎 苹果服务",
    "type": "select",
    "proxies": ["🔰 模式选择", "⚙️ 节点选择", "🕊️ 落地节点", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)", "🔗 全局直连"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
  },
  {
    ...groupBaseOption,
    "name": "Ⓜ️ 微软服务",
    "type": "select",
    "proxies": ["🔰 模式选择", "⚙️ 节点选择", "🕊️ 落地节点", "🔗 全局直连", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg"
  },
  {
    ...groupBaseOption,
    "name": "🥰 广告过滤",
    "type": "select",
    "proxies": ["REJECT", "DIRECT"],
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bug.svg"
  },
  {
    ...groupBaseOption,
    "name": "🔗 全局直连",
    "type": "select",
    "proxies": ["DIRECT", "⚙️ 节点选择", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
  },
  {
    ...groupBaseOption,
    "name": "❌ 全局拦截",
    "type": "select",
    "proxies": ["REJECT", "DIRECT"],
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg"
  },
  {
    ...groupBaseOption,
    "name": "🐬 自定义直连",
    "type": "select",
    "include-all": true,
    "proxies": ["🔗 全局直连", "🔰 模式选择", "⚙️ 节点选择", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)"],
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/unknown.svg"
  },
  {
    ...groupBaseOption,
    "name": "🐳 自定义代理",
    "type": "select",
    "include-all": true,
    "proxies": ["🔰 模式选择", "⚙️ 节点选择", "🕊️ 落地节点", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)", "🔗 全局直连"],
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/openwrt.svg"
  },
  {
    ...groupBaseOption,
    "name": "🐟 漏网之鱼",
    "type": "select",
    "proxies": ["🔰 模式选择", "⚙️ 节点选择", "🕊️ 落地节点", "♻️ 延迟选优", "🚑 故障转移", "⚖️ 负载均衡(散列)", "☁️ 负载均衡(轮询)", "🔗 全局直连"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
  }
];

// 多订阅合并，这里添加额外的地址
const proxyProviders = {
  // "狗子云": {
  //   "type": "http",   // 订阅链接
  //   "url": "https://pwac.gzi8998-ddns0721.eu/api/v1/gzcloud/subscribe?token=1b73e40b0add45cdbbc29bfd6b30d691",
  //   "interval": 86400,  // 自动更新时间 86400 (秒) / 3600 = 24 小时
  //   "proxy": "🔰 模式选择",
  //   "override": {
  //     "additional-prefix": "狗子云 | "  // 节点名称前缀 p1，用于区别机场节点
  //   }
  // },
  // "赔钱": {
  //   "type": "http",   // 订阅链接
  //   "url": "https://dash.pqjc.site/api/v1/pq/9aae40920b1a7048052e01942aa3cef8",
  //   "interval": 86400,  // 自动更新时间 86400 (秒) / 3600 = 24 小时
  //   "proxy": "🔰 模式选择",
  //   "override": {
  //     "additional-prefix": "赔钱 | "  // 节点名称前缀 p1，用于区别机场节点
  //   }
  // },
  // 其他订阅地址
}

// 程序入口
function main(config) {
  const originalProxies = config?.proxies ? [...config.proxies] : [];
  const proxyCount = originalProxies.length;
  const originalProviders = config?.["proxy-providers"] || {};
  const proxyProviderCount = originalProviders !== null && typeof originalProviders === 'object'
    ? Object.keys(originalProviders).length
    : 0;

  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  config["dns"] = dnsConfig;
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;

  // Process original proxies (ensure UDP)
  const processedProxies = originalProxies.map(proxy => {
    if (proxy && typeof proxy === 'object' && proxy.name) {
      proxy.udp = true;
      // proxy["interface-name"] = "WLAN";   // 如需绑定网卡可取消注释
      // proxy["interface-name"] = "以太网";
    } else {
      console.warn("警告：发现一个无效或缺少名称的原始代理配置:", proxy);
      return null;
    }
    return proxy;
  }).filter(p => p !== null);

  // Combine proxies
  config["proxies"] = [...processedProxies, ...landingNodeProxies];
  config["proxy-providers"] = {
    ...originalProviders,
    ...proxyProviders
  };

  // ==================== 节点过滤相关 ====================
  // 转义正则元字符（用于落地节点精确排除）
  function escapeForRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // 构造落地节点精确排除正则（只排除完全等于落地节点名称的）
  const landingNodeNames = landingNodeProxies.map(p => p.name);
  const escapedNames = landingNodeNames
    .map(escapeForRegExp)
    .join('|');
  const excludeLandingFilter = escapedNames
    ? `^(?:${escapedNames})$`
    : null;

  // 需要排除落地节点的组
  const groupsToExcludeLandingNodes = [
    "⚙️ 节点选择",
    "♻️ 延迟选优",
    "⚖️ 负载均衡(散列)",
    "☁️ 负载均衡(轮询)"
  ];

  // ==================== 干净节点过滤器（排除垃圾信息）===================
  // 使用最稳定、最常用的写法（忽略大小写）
  const cleanExcludeFilter = "(?i)套餐|重置|剩余|到期|订阅|群|账户|流量|有效期|时间|官网|失联|余额|测试|试用|过期|Trial|Account|流量用尽";

  // 需要显示干净节点列表的组（可自行增删）
  const groupsNeedClean = [
    "⚙️ 节点选择",
    "♻️ 延迟选优",
    "🚑 故障转移",
    "⚖️ 负载均衡(散列)",
    "☁️ 负载均衡(轮询)",
    "🐟 漏网之鱼",
    "🌍 国外媒体"
    // 如果你还有其他组也想要干净列表，可以继续添加
  ];

  // ==================== 处理代理组 ====================
  const finalProxyGroups = proxyGroupsConfig.map(group => {
    // 1. 先添加干净节点过滤（排除套餐、剩余流量等垃圾信息）
    if (groupsNeedClean.includes(group.name)) {
      const existing = group["exclude-filter"];
      group["exclude-filter"] = existing
        ? `${existing}|${cleanExcludeFilter}`
        : cleanExcludeFilter;
    }

    // 2. 再处理落地节点排除（仅对指定组生效）
    if (groupsToExcludeLandingNodes.includes(group.name) && excludeLandingFilter) {
      const existingFilter = group["exclude-filter"];
      group["exclude-filter"] = existingFilter
        ? `(${existingFilter})|(${excludeLandingFilter})`
        : excludeLandingFilter;

      console.log(
        `信息：为组 [${group.name}] 添加或合并了落地节点排除过滤器: ${group["exclude-filter"]}`
      );
    }

    return group;
  });

  config["proxy-groups"] = finalProxyGroups;
  return config;
}
