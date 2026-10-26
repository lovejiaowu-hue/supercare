/** Care record schemas — observation/recording only, not medical advice. */
export const CATEGORIES = [
 {id:'vitals',label:'生命体征',icon:'heart-pulse',group:'health',tags:['已测量','较平时变化','需要复测']},
 {id:'food',label:'饮食记录',icon:'utensils',group:'daily',tags:['早餐','午餐','晚餐','加餐','食欲好','食欲一般','食欲差','已完成']},
 {id:'toilet',label:'大小便',icon:'droplets',group:'daily',tags:['大便','小便','无异常','偏干','偏稀','量少','颜色变化']},
 {id:'medication',label:'用药情况',icon:'pill',group:'health',tags:['按医嘱服用','漏服','拒服','出现不适','已向医护反馈']},
 {id:'activity',label:'活动情况',icon:'footprints',group:'daily',tags:['床上活动','下床活动','室内走动','户外活动','需要协助','有跌倒风险']},
 {id:'stoma',label:'造口护理',icon:'bandage',group:'professional',tags:['更换造口袋','皮肤观察','颜色变化','异常渗漏','已联系医护']},
 {id:'drainage',label:'管路护理',icon:'droplets',group:'professional',tags:['固定良好','通畅','周围红肿','发生渗漏','已联系医护']},
 {id:'wound',label:'伤口护理',icon:'bandage',group:'professional',tags:['已按医嘱换药','清洁干燥','红肿','渗液','出血','已联系医护']},
 {id:'pain',label:'疼痛评估',icon:'activity',group:'health',tags:['持续性','间歇性','活动时加重','休息后缓解','已反馈']},
 {id:'skin',label:'皮肤护理',icon:'hand-heart',group:'daily',tags:['皮肤完整','局部发红','干燥','潮湿','按计划翻身','已向医护反馈']},
 {id:'fluid',label:'引流液记录',icon:'droplets',group:'professional',tags:['清亮','浑浊','颜色变化','量增加','量减少','已向医护反馈']},
 {id:'mood',label:'心理状态',icon:'bed-double',group:'daily',tags:['情绪平稳','心情低落','烦躁','交流顺畅','睡眠良好','睡眠一般']}
];
export const CATEGORIES_BY_ID=Object.fromEntries(CATEGORIES.map(c=>[c.id,c]));
export const EXAMPLE = {
 patients:[{id:'example-person',name:'示例长者',age:'76',gender:'女',relationship:'家属照护',disease:'示例数据，请替换',selfCare:'部分需要协助',allergy:'',notes:'这里只是体验演示，切勿将示例当成真实医嘱。',carePlan:'关注日常起居、记录体征变化。',status:'active',createdAt:new Date().toISOString()}],
 records:[
  {id:'sample-1',patientId:'example-person',type:'vitals',time:new Date().toISOString(),note:'上午测量生命体征，已记录在下方数值中。',tags:['已测量'],details:{temp:'36.7',systolic:'126',diastolic:'78',heartRate:'76',oxygenSat:'98'},photos:[],author:'护工',createdAt:new Date().toISOString(),history:[]},
  {id:'sample-2',patientId:'example-person',type:'food',time:new Date().toISOString(),note:'早餐：小米粥、鸡蛋，食欲尚可。',tags:['早餐','食欲好'],details:{},photos:[],author:'家属',createdAt:new Date().toISOString(),history:[]}
 ],activePatientId:'example-person'
};