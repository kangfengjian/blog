import uuid  
import pandas as pd
from datetime import datetime  
import shutil



bills = list()
fuhehuolongleixing = pd.read_csv('../activates.csv')
zhanghuliebiao = pd.read_csv('../account.csv')
# print(zhanghuliebiao)
# print(fuhehuolongleixing)

def get_uuid():
    # 生成一个随机的 UUID  
    random_uuid = str(uuid.uuid4()).replace('-','')  
    return random_uuid

def get_now():
    # 获取当前时间  
    formatted_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")  # 格式为：年-月-日 时:分:秒  
    return formatted_time

def undate_tongji():
    pass

def xiaofei():
    fuhe_uuid = get_uuid()
    # 元活动1
    bills.append(dict())
    bills[0]['复合活动id'] = fuhe_uuid
    bills[0]['基本活动id'] = get_uuid()
    bills[0]['主活动标识'] = False
    bills[0]['活动逻辑顺序'] = '1'
    bills[0]['活动时间'] = input('请输入活动时间：')
    bills[0]['记录时间'] = get_now()
    bills[0]['活动地点'] = input('请输入活动地点：')
    str_zhanghu = ' '.join(['{}.{}'.format(i+1,j) for i,j in enumerate(zhanghuliebiao['账户描述'].to_list())])
    n = int(input('请选择支出账户：'+str_zhanghu+'\n'))-1
    bills[0]['付款方'] = zhanghuliebiao['对方'].to_list()[n]
    bills[0]['收款方'] = '康风建'
    bills[0]['记账途径'] = zhanghuliebiao['账户描述'].to_list()[n]
    bills[0]['金额'] =  '{:.2f}'.format(float(input('请输入金额：')))
    bills[0]['有效标识'] = True
    bills[0]['还款标识'] = False
    bills[0]['还款活动'] = ''
    # 元活动2
    bills.append(dict())
    bills[1]['复合活动id'] = fuhe_uuid
    bills[1]['基本活动id'] = get_uuid()
    bills[1]['主活动标识'] = True
    bills[1]['活动逻辑顺序'] = '2'
    bills[1]['活动时间'] = bills[0]['活动时间']
    bills[1]['记录时间'] = bills[0]['记录时间']
    bills[1]['活动地点'] = bills[0]['活动地点']
    bills[1]['付款方'] = '康风建'
    bills[1]['收款方'] = input('请选择收款方（可省略）：')
    bills[1]['记账途径'] = input('请选择支付途径：')
    bills[1]['金额'] = bills[0]['金额']
    bills[1]['标的物'] = input('请选择标的物：')
    bills[1]['备注'] = input('请输入备注：')
    bills[1]['有效标识'] = True
    shutil.copy2('../bills.csv', '../bills-{}.csv'.format(get_now().replace('-','').replace(' ','').replace(':','')))
    old_bills = pd.read_csv('../bills.csv')
    new_bills = pd.concat([old_bills,pd.DataFrame(bills)])
    new_bills.to_csv('../bills.csv',index=False)
    # print(new_bills)


def kebaoxiao():
    fuhe_uuid = get_uuid()
    # 元活动1
    bills.append(dict())
    bills[0]['复合活动id'] = fuhe_uuid
    bills[0]['基本活动id'] = get_uuid()
    bills[0]['主活动标识'] = False
    bills[0]['活动逻辑顺序'] = '1'
    bills[0]['活动时间'] = input('请输入活动时间：')
    bills[0]['记录时间'] = get_now()
    bills[0]['活动地点'] = input('请输入活动地点：')
    str_zhanghu = ' '.join(['{}.{}'.format(i+1,j) for i,j in enumerate(zhanghuliebiao['账户描述'].to_list())])
    n = int(input('请选择支出账户：'+str_zhanghu+'\n'))-1
    bills[0]['付款方'] = zhanghuliebiao['对方'].to_list()[n]
    bills[0]['收款方'] = '康风建'
    bills[0]['记账途径'] = zhanghuliebiao['账户描述'].to_list()[n]
    bills[0]['金额'] =  '{:.2f}'.format(float(input('请输入金额：')))
    bills[0]['有效标识'] = True
    bills[0]['还款标识'] = False
    bills[0]['还款活动'] = ''
    # 元活动2
    bills.append(dict())
    bills[1]['复合活动id'] = fuhe_uuid
    bills[1]['基本活动id'] = get_uuid()
    bills[1]['主活动标识'] = True
    bills[1]['活动逻辑顺序'] = '2'
    bills[1]['活动时间'] = bills[0]['活动时间']
    bills[1]['记录时间'] = bills[0]['记录时间']
    bills[1]['活动地点'] = bills[0]['活动地点']
    bills[1]['付款方'] = '康风建'
    bills[1]['收款方'] = input('请选择报销方：')
    bills[1]['记账途径'] = input('请选择支付途径：')
    bills[1]['金额'] = bills[0]['金额']
    # bills[1]['标的物'] = input('请选择标的物：')
    # bills[1]['备注'] = input('请输入备注：')
    bills[1]['有效标识'] = True
    # 元活动3
    bills.append(dict())
    bills[2]['复合活动id'] = fuhe_uuid
    bills[2]['基本活动id'] = get_uuid()
    bills[2]['主活动标识'] = False
    bills[2]['活动逻辑顺序'] = '3'
    bills[2]['活动时间'] = bills[0]['活动时间']
    bills[2]['记录时间'] = bills[0]['记录时间']
    bills[2]['活动地点'] = bills[0]['活动地点']
    bills[2]['付款方'] = bills[1]['收款方']
    bills[2]['收款方'] = input('请选择收款方（可省略）：')
    bills[2]['记账途径'] = '康风建'
    bills[2]['金额'] = bills[0]['金额']
    bills[2]['标的物'] = input('请选择标的物：')
    bills[2]['备注'] = input('请输入备注：')
    bills[2]['有效标识'] = True
    shutil.copy2('../bills.csv', '../bills-{}.csv'.format(get_now().replace('-','').replace(' ','').replace(':','')))
    old_bills = pd.read_csv('../bills.csv')
    new_bills = pd.concat([old_bills,pd.DataFrame(bills)],axis=0)
    new_bills.to_csv('../bills.csv',index=False)
    # print(new_bills)



if __name__ =='__main__':
    # print(get_uuid())
    # quit()
    print('欢迎进入“友钱”记账系统')
    print()
    str_fuhehuolongleixing = ' '.join(['{}.{}'.format(i+1,j) for i,j in enumerate(fuhehuolongleixing['复合活动类型'].to_list())])
    xuanze = int(input('请选择活动类型：'+str_fuhehuolongleixing+'\n'))-1
    if fuhehuolongleixing['复合活动类型'].to_list()[xuanze] == '消费':
        print()
        xiaofei()
    elif fuhehuolongleixing['复合活动类型'].to_list()[xuanze] == '可报销':
        print()
        kebaoxiao()