// ═══════════════════════════════════════════════════════════════
//  dashboard_data.js — gerado automaticamente por update_data.py
//  Última atualização: 10/04/2026
//  Fonte: meli-bi-data.SBOX_CREDITSTC.CARTAO_EXPIRADO_ANL_IA
//         meli-bi-data.SBOX_CREDITSTC.CARTAO_EXPIRADO_CUBO_IA
// ═══════════════════════════════════════════════════════════════

// ── DATA DA ÚLTIMA ATUALIZAÇÃO ────────────────────────────────
const DT_ATUALIZACAO = '10/04/2026';

// ── TOTAIS MENSAIS REAIS (BigQuery) ───────────────────────────
const MONTHLY = [
  {mes:'Abr/25', completo:true, ren:14, rei:1, ent:13, dm:4.90, tel:19},
  {mes:'Mai/25', completo:true, ren:1075, rei:69, ent:923, dm:6.90, tel:1354},
  {mes:'Jun/25', completo:true, ren:15969, rei:1003, ent:13869, dm:6.90, tel:20137},
  {mes:'Jul/25', completo:true, ren:29502, rei:1584, ent:23942, dm:8.20, tel:37719},
  {mes:'Ago/25', completo:true, ren:29404, rei:1805, ent:22886, dm:5.70, tel:39652},
  {mes:'Set/25', completo:true, ren:35274, rei:2254, ent:27130, dm:5.00, tel:48294},
  {mes:'Out/25', completo:true, ren:30831, rei:1761, ent:23486, dm:4.10, tel:43202},
  {mes:'Nov/25', completo:true, ren:46256, rei:2685, ent:34694, dm:4.00, tel:65527},
  {mes:'Dez/25', completo:true, ren:54975, rei:4076, ent:40771, dm:4.50, tel:77698},
  {mes:'Jan/26', completo:true, ren:27374, rei:2092, ent:19819, dm:4.10, tel:38177},
  {mes:'Fev/26', completo:true, ren:14121, rei:1478, ent:10027, dm:4.00, tel:20976},
  {mes:'Mar/26', completo:true, ren:10370, rei:638, ent:6588, dm:3.90, tel:15821},
  {mes:'Abr/26*', completo:false, ren:7658, rei:0, ent:192, dm:3.10, tel:22393},
];

// ── SUMÁRIO EXECUTIVO ─────────────────────────────────────────
const SUMARIO_TOTAL = {
  qtde_total:          0,
  qtde_renovados:      0,
  qtde_reemitidos:     0,
  qtde_total_renov:    0,
  qtde_entregue:       0,
  qtde_desbloqueado:   0,
};
const SUMARIO_CICLO = [];

// ── FUNIL DE ATIVAÇÃO PÓS-RENOVAÇÃO ──────────────────────────
const FUNIL_DATA = [
  {safra:'202504', base:15, entregue:13, ativados:13, ativos_tc:4, ativos_td:13, ativos_fisico:13, ativos_ambos:0, tpv_tc:3256, tpv_td:103932, tpn_tc:0, tpn_td:0, maps_tc:4, maps_td:13},
  {safra:'202505', base:1144, entregue:1019, ativados:923, ativos_tc:492, ativos_td:583, ativos_fisico:789, ativos_ambos:0, tpv_tc:844463, tpv_td:1128877, tpn_tc:0, tpn_td:0, maps_tc:492, maps_td:583},
  {safra:'202506', base:16972, entregue:15299, ativados:13869, ativos_tc:7909, ativos_td:8693, ativos_fisico:11890, ativos_ambos:0, tpv_tc:15512499, tpv_td:16299444, tpn_tc:0, tpn_td:0, maps_tc:7909, maps_td:8693},
  {safra:'202507', base:31086, entregue:28040, ativados:23942, ativos_tc:13386, ativos_td:15080, ativos_fisico:20605, ativos_ambos:0, tpv_tc:27860198, tpv_td:28118808, tpn_tc:0, tpn_td:0, maps_tc:13386, maps_td:15080},
  {safra:'202508', base:31209, entregue:27717, ativados:22886, ativos_tc:12711, ativos_td:14805, ativos_fisico:19986, ativos_ambos:0, tpv_tc:26102447, tpv_td:27988183, tpn_tc:0, tpn_td:0, maps_tc:12711, maps_td:14805},
  {safra:'202509', base:37528, entregue:33382, ativados:27130, ativos_tc:14944, ativos_td:17906, ativos_fisico:23968, ativos_ambos:0, tpv_tc:30987292, tpv_td:32653476, tpn_tc:0, tpn_td:0, maps_tc:14944, maps_td:17906},
  {safra:'202510', base:32592, entregue:29731, ativados:23486, ativos_tc:12980, ativos_td:15559, ativos_fisico:20882, ativos_ambos:0, tpv_tc:27982414, tpv_td:31494815, tpn_tc:0, tpn_td:0, maps_tc:12980, maps_td:15559},
  {safra:'202511', base:48941, entregue:44792, ativados:34694, ativos_tc:19655, ativos_td:22970, ativos_fisico:31115, ativos_ambos:0, tpv_tc:39223624, tpv_td:40750127, tpn_tc:0, tpn_td:0, maps_tc:19655, maps_td:22970},
  {safra:'202512', base:59051, entregue:53410, ativados:40771, ativos_tc:23429, ativos_td:26933, ativos_fisico:36801, ativos_ambos:0, tpv_tc:47624062, tpv_td:46329358, tpn_tc:0, tpn_td:0, maps_tc:23429, maps_td:26933},
  {safra:'202601', base:29466, entregue:26763, ativados:19819, ativos_tc:11395, ativos_td:13238, ativos_fisico:17982, ativos_ambos:0, tpv_tc:22816149, tpv_td:21647332, tpn_tc:0, tpn_td:0, maps_tc:11395, maps_td:13238},
  {safra:'202602', base:15599, entregue:13779, ativados:10027, ativos_tc:5888, ativos_td:5735, ativos_fisico:8695, ativos_ambos:0, tpv_tc:10086777, tpv_td:7187868, tpn_tc:0, tpn_td:0, maps_tc:5888, maps_td:5735},
  {safra:'202603', base:11008, entregue:9756, ativados:6588, ativos_tc:3506, ativos_td:3390, ativos_fisico:5405, ativos_ambos:0, tpv_tc:4104618, tpv_td:2699191, tpn_tc:0, tpn_td:0, maps_tc:3506, maps_td:3390},
  {safra:'202604', base:7658, entregue:2513, ativados:192, ativos_tc:1545, ativos_td:1847, ativos_fisico:2829, ativos_ambos:0, tpv_tc:1684476, tpv_td:1026338, tpn_tc:0, tpn_td:0, maps_tc:1545, maps_td:1847},
];

// ── SPENDING ANTES DA RENOVAÇÃO ───────────────────────────────
const SPENDING_ANTES = [
  {safra:'202504', tpv_tc_antes:7238.28, tpv_td_antes:139590.89, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202505', tpv_tc_antes:932059.83, tpv_td_antes:1349661.19, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202506', tpv_tc_antes:15524037.41, tpv_td_antes:19603234.49, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202507', tpv_tc_antes:28872548.76, tpv_td_antes:34847930.56, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202508', tpv_tc_antes:28230730.32, tpv_td_antes:35627066.84, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202509', tpv_tc_antes:33970446.80, tpv_td_antes:41532757.44, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202510', tpv_tc_antes:29830934.01, tpv_td_antes:39241034.53, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202511', tpv_tc_antes:44395443.47, tpv_td_antes:53441044.51, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202512', tpv_tc_antes:56967074.85, tpv_td_antes:60449175.32, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202601', tpv_tc_antes:29432347.99, tpv_td_antes:32353048.57, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202602', tpv_tc_antes:17485707.82, tpv_td_antes:15489675.83, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202603', tpv_tc_antes:12708467.72, tpv_td_antes:10304208.35, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202604', tpv_tc_antes:16506531.89, tpv_td_antes:13797371.92, tpn_tc_antes:0, tpn_td_antes:0},
];

// ── CICLO DE USO POR SAFRA ─────────────────────────────────────
const CICLO_SAFRA = [
  {safra:'202504', c1:12, c2:0, c3:0, c4:0, c5:0, c6:3, c7:0},
  {safra:'202505', c1:300, c2:67, c3:56, c4:42, c5:50, c6:504, c7:125},
  {safra:'202506', c1:4712, c2:977, c3:667, c4:563, c5:860, c6:7338, c7:1855},
  {safra:'202507', c1:8470, c2:1657, c3:1178, c4:960, c5:1420, c6:13933, c7:3468},
  {safra:'202508', c1:8429, c2:1647, c3:1107, c4:927, c5:1450, c6:14127, c7:3522},
  {safra:'202509', c1:10193, c2:1931, c3:1352, c4:1142, c5:1772, c6:16921, c7:4217},
  {safra:'202510', c1:9391, c2:1664, c3:1137, c4:948, c5:2351, c6:12990, c7:4111},
  {safra:'202511', c1:13637, c2:2640, c3:1798, c4:1528, c5:4555, c6:18509, c7:6274},
  {safra:'202512', c1:16291, c2:3154, c3:2230, c4:3714, c5:4075, c6:21346, c7:8241},
  {safra:'202601', c1:8264, c2:1569, c3:2208, c4:1444, c5:1730, c6:10106, c7:4145},
  {safra:'202602', c1:3906, c2:1376, c3:844, c4:559, c5:864, c6:4799, c7:3251},
  {safra:'202603', c1:2982, c2:691, c3:451, c4:381, c5:521, c6:3339, c7:2643},
  {safra:'202604', c1:2148, c2:445, c3:351, c4:263, c5:371, c6:2184, c7:1896},
];

// ── DISTRIBUIÇÃO DIAS_ENTREGA POR FAIXA/MÊS ──────────────────
const DIAS_ENTREGA_DIST = {
  '202504': {'00. CARTAO NAO ENTREGUE': 1, '01. ATE 2 DIAS': 2, '02. ATE 5 DIAS': 4, '03. ATE 7 DIAS': 5, '04. ATE 10 DIAS': 2, '06. NAO RENOVADO': 5},
  '202505': {'00. CARTAO NAO ENTREGUE': 56, '01. ATE 2 DIAS': 12, '02. ATE 5 DIAS': 334, '03. ATE 7 DIAS': 297, '04. ATE 10 DIAS': 176, '05. ACIMA DE 10 DIAS': 200, '06. NAO RENOVADO': 279},
  '202506': {'00. CARTAO NAO ENTREGUE': 670, '01. ATE 2 DIAS': 478, '02. ATE 5 DIAS': 5736, '03. ATE 7 DIAS': 2796, '04. ATE 10 DIAS': 3170, '05. ACIMA DE 10 DIAS': 3119, '06. NAO RENOVADO': 4169},
  '202507': {'00. CARTAO NAO ENTREGUE': 1463, '01. ATE 2 DIAS': 758, '02. ATE 5 DIAS': 6809, '03. ATE 7 DIAS': 4852, '04. ATE 10 DIAS': 6017, '05. ACIMA DE 10 DIAS': 9603, '06. NAO RENOVADO': 8217},
  '202508': {'00. CARTAO NAO ENTREGUE': 1687, '01. ATE 2 DIAS': 3607, '02. ATE 5 DIAS': 11710, '03. ATE 7 DIAS': 5065, '04. ATE 10 DIAS': 3003, '05. ACIMA DE 10 DIAS': 4332, '06. NAO RENOVADO': 10249},
  '202509': {'00. CARTAO NAO ENTREGUE': 1895, '01. ATE 2 DIAS': 6008, '02. ATE 5 DIAS': 15336, '03. ATE 7 DIAS': 5448, '04. ATE 10 DIAS': 2772, '05. ACIMA DE 10 DIAS': 3815, '06. NAO RENOVADO': 13021},
  '202510': {'00. CARTAO NAO ENTREGUE': 1102, '01. ATE 2 DIAS': 7758, '02. ATE 5 DIAS': 14473, '03. ATE 7 DIAS': 4253, '04. ATE 10 DIAS': 1628, '05. ACIMA DE 10 DIAS': 1617, '06. NAO RENOVADO': 12373},
  '202511': {'00. CARTAO NAO ENTREGUE': 1466, '01. ATE 2 DIAS': 10151, '02. ATE 5 DIAS': 23011, '03. ATE 7 DIAS': 8106, '04. ATE 10 DIAS': 1974, '05. ACIMA DE 10 DIAS': 1548, '06. NAO RENOVADO': 19273},
  '202512': {'00. CARTAO NAO ENTREGUE': 1568, '01. ATE 2 DIAS': 8637, '02. ATE 5 DIAS': 27157, '03. ATE 7 DIAS': 11274, '04. ATE 10 DIAS': 3732, '05. ACIMA DE 10 DIAS': 2607, '06. NAO RENOVADO': 22723},
  '202601': {'00. CARTAO NAO ENTREGUE': 611, '01. ATE 2 DIAS': 5930, '02. ATE 5 DIAS': 13704, '03. ATE 7 DIAS': 4872, '04. ATE 10 DIAS': 1448, '05. ACIMA DE 10 DIAS': 809, '06. NAO RENOVADO': 10803},
  '202602': {'00. CARTAO NAO ENTREGUE': 344, '01. ATE 2 DIAS': 2915, '02. ATE 5 DIAS': 7301, '03. ATE 7 DIAS': 2530, '04. ATE 10 DIAS': 676, '05. ACIMA DE 10 DIAS': 355, '06. NAO RENOVADO': 6857},
  '202603': {'00. CARTAO NAO ENTREGUE': 295, '01. ATE 2 DIAS': 2382, '02. ATE 5 DIAS': 5201, '03. ATE 7 DIAS': 1744, '04. ATE 10 DIAS': 560, '05. ACIMA DE 10 DIAS': 188, '06. NAO RENOVADO': 5451},
  '202604': {'00. CARTAO NAO ENTREGUE': 2364, '01. ATE 2 DIAS': 2104, '02. ATE 5 DIAS': 2532, '03. ATE 7 DIAS': 514, '04. ATE 10 DIAS': 84, '05. ACIMA DE 10 DIAS': 60, '06. NAO RENOVADO': 14735}
};

// ── DISTRIBUIÇÃO DIAS_ENTREGA V2 (dias inteiros do tracking) ──
const DIAS_ENTREGA_V2 = {
  '202504': {'2': 4, '4': 3, '5': 2, '6': 1, '7': 5, '8': 2},
  '202505': {'10': 33, '11': 30, '12': 18, '13': 14, '14': 17, '15': 16, '16': 9, '17': 8, '18': 11, '19': 9, '2': 12, '20': 6, '21': 7, '22': 8, '23': 2, '24': 6, '25': 2, '26': 3, '27': 4, '28': 3, '29': 6, '3': 76, '32': 2, '33': 1, '34': 2, '36': 5, '37': 1, '39': 1, '4': 77, '41': 1, '42': 3, '5': 181, '51': 1, '52': 1, '6': 164, '7': 134, '8': 90, '9': 53},
  '202506': {'1': 4, '10': 764, '11': 500, '12': 353, '13': 184, '14': 170, '15': 235, '16': 190, '17': 190, '18': 129, '19': 148, '2': 474, '20': 88, '21': 87, '22': 111, '23': 69, '24': 79, '25': 73, '26': 61, '27': 34, '28': 34, '29': 51, '3': 1495, '30': 38, '31': 42, '32': 26, '33': 33, '34': 11, '35': 10, '36': 23, '37': 13, '38': 20, '39': 6, '4': 2145, '40': 12, '41': 8, '42': 7, '43': 8, '44': 6, '45': 6, '46': 11, '47': 4, '48': 5, '5': 2095, '50': 4, '51': 5, '52': 3, '53': 3, '54': 2, '55': 1, '56': 1, '57': 3, '58': 2, '59': 2, '6': 1601, '60': 1, '7': 1195, '8': 1398, '9': 1008},
  '202507': {'1': 5, '10': 1493, '11': 1307, '12': 1272, '13': 1263, '14': 939, '15': 813, '16': 638, '17': 519, '18': 316, '19': 261, '2': 753, '20': 272, '21': 258, '22': 197, '23': 156, '24': 136, '25': 76, '26': 87, '27': 139, '28': 134, '29': 90, '3': 2087, '30': 90, '31': 70, '32': 45, '33': 58, '34': 62, '35': 55, '36': 46, '37': 38, '38': 24, '39': 21, '4': 2706, '40': 25, '41': 21, '42': 18, '43': 30, '44': 12, '45': 7, '46': 7, '47': 5, '48': 10, '49': 11, '5': 2017, '50': 11, '51': 5, '52': 4, '53': 1, '54': 3, '55': 5, '56': 3, '57': 5, '58': 4, '59': 1, '6': 2521, '7': 2332, '8': 2620, '9': 1904},
  '202508': {'1': 98, '10': 672, '11': 500, '12': 457, '13': 443, '14': 350, '15': 273, '16': 296, '17': 236, '18': 215, '19': 187, '2': 3509, '20': 169, '21': 168, '22': 106, '23': 93, '24': 88, '25': 68, '26': 64, '27': 80, '28': 53, '29': 60, '3': 3796, '30': 47, '31': 34, '32': 30, '33': 26, '34': 31, '35': 30, '36': 28, '37': 22, '38': 18, '39': 9, '4': 3964, '40': 10, '41': 18, '42': 8, '43': 8, '44': 10, '45': 3, '46': 1, '47': 3, '48': 7, '49': 10, '5': 3949, '50': 6, '51': 5, '52': 4, '53': 3, '54': 2, '55': 1, '57': 3, '58': 2, '59': 3, '6': 2941, '60': 2, '7': 2124, '8': 1409, '9': 922},
  '202509': {'1': 576, '10': 565, '11': 494, '12': 402, '13': 331, '14': 371, '15': 226, '16': 253, '17': 225, '18': 181, '19': 165, '2': 5432, '20': 134, '21': 140, '22': 102, '23': 68, '24': 72, '25': 71, '26': 50, '27': 44, '28': 51, '29': 41, '3': 5780, '30': 35, '31': 36, '32': 28, '33': 31, '34': 25, '35': 27, '36': 15, '37': 17, '38': 14, '39': 7, '4': 5025, '40': 11, '41': 7, '42': 7, '43': 7, '44': 8, '45': 6, '46': 7, '47': 4, '48': 7, '49': 6, '5': 4531, '50': 5, '51': 3, '52': 2, '53': 4, '54': 3, '55': 4, '56': 4, '57': 1, '58': 1, '59': 4, '6': 3142, '60': 1, '7': 2307, '8': 1339, '9': 868},
  '202510': {'1': 1587, '10': 280, '11': 206, '12': 163, '13': 143, '14': 167, '15': 111, '16': 108, '17': 80, '18': 69, '19': 53, '2': 6171, '20': 60, '21': 41, '22': 44, '23': 46, '24': 31, '25': 21, '26': 26, '27': 25, '28': 27, '29': 19, '3': 5802, '30': 22, '31': 12, '32': 18, '33': 12, '34': 13, '35': 15, '36': 6, '37': 8, '38': 6, '39': 5, '4': 4573, '40': 13, '41': 2, '42': 4, '43': 6, '44': 1, '45': 3, '46': 3, '47': 1, '49': 1, '5': 4096, '51': 2, '52': 2, '53': 1, '54': 2, '55': 3, '57': 1, '6': 2520, '60': 1, '7': 1733, '8': 877, '9': 472},
  '202511': {'1': 1716, '10': 290, '11': 124, '12': 130, '13': 136, '14': 119, '15': 79, '16': 108, '17': 60, '18': 52, '19': 52, '2': 8435, '20': 72, '21': 52, '22': 54, '23': 42, '24': 24, '25': 23, '26': 41, '27': 35, '28': 30, '29': 23, '3': 9259, '30': 24, '31': 20, '32': 11, '33': 24, '34': 17, '35': 16, '36': 11, '37': 6, '38': 6, '39': 6, '4': 7470, '40': 12, '41': 14, '42': 9, '43': 6, '44': 5, '45': 2, '46': 5, '47': 5, '48': 1, '49': 7, '5': 6281, '50': 5, '51': 2, '52': 2, '53': 2, '54': 4, '55': 2, '57': 3, '58': 3, '59': 2, '6': 5158, '60': 4, '7': 2949, '8': 1173, '9': 511},
  '202512': {'0': 1, '1': 1676, '10': 671, '11': 463, '12': 336, '13': 265, '14': 154, '15': 104, '16': 98, '17': 70, '18': 73, '19': 58, '2': 6961, '20': 50, '21': 66, '22': 53, '23': 44, '24': 31, '25': 49, '26': 44, '27': 56, '28': 52, '29': 47, '3': 9532, '30': 34, '31': 32, '32': 35, '33': 21, '34': 25, '35': 27, '36': 17, '37': 22, '38': 25, '39': 18, '4': 9206, '40': 20, '41': 15, '42': 13, '43': 14, '44': 9, '45': 14, '46': 7, '47': 8, '48': 6, '49': 5, '5': 8419, '50': 7, '51': 5, '52': 6, '53': 11, '54': 5, '55': 1, '56': 5, '57': 6, '58': 3, '59': 5, '6': 6707, '60': 1, '7': 4567, '8': 2070, '9': 991},
  '202601': {'1': 1374, '10': 194, '11': 139, '12': 92, '13': 44, '14': 35, '15': 32, '16': 22, '17': 25, '18': 24, '19': 19, '2': 4556, '20': 22, '21': 32, '22': 19, '23': 16, '24': 20, '25': 19, '26': 15, '27': 16, '28': 17, '29': 10, '3': 5097, '30': 10, '31': 5, '32': 5, '33': 12, '34': 11, '35': 10, '36': 4, '37': 13, '38': 11, '39': 6, '4': 4379, '40': 5, '41': 3, '42': 7, '43': 5, '44': 7, '45': 5, '46': 3, '47': 2, '48': 7, '49': 4, '5': 4229, '50': 3, '51': 3, '52': 2, '53': 3, '54': 1, '56': 1, '57': 1, '58': 1, '6': 3210, '60': 1, '7': 1662, '8': 884, '9': 370},
  '202602': {'1': 635, '10': 69, '11': 49, '12': 33, '13': 24, '14': 12, '15': 12, '16': 14, '17': 14, '18': 15, '19': 9, '2': 2279, '20': 8, '21': 11, '22': 11, '23': 10, '24': 9, '25': 11, '26': 5, '27': 4, '28': 11, '29': 7, '3': 2956, '30': 7, '31': 8, '32': 7, '33': 1, '34': 3, '35': 3, '36': 1, '37': 7, '38': 4, '39': 4, '4': 2164, '40': 5, '42': 7, '44': 4, '45': 1, '47': 2, '48': 1, '49': 1, '5': 2181, '51': 1, '52': 1, '56': 1, '57': 2, '58': 1, '6': 1656, '60': 2, '7': 874, '8': 416, '9': 191},
  '202603': {'0': 1, '1': 488, '10': 62, '11': 27, '12': 16, '13': 14, '14': 5, '15': 13, '16': 11, '17': 7, '18': 11, '19': 9, '2': 1893, '20': 5, '21': 4, '22': 7, '23': 8, '24': 5, '26': 4, '27': 5, '28': 4, '29': 1, '3': 1970, '30': 5, '31': 5, '32': 5, '33': 3, '35': 3, '36': 1, '37': 4, '39': 1, '4': 1677, '40': 1, '41': 2, '44': 1, '5': 1554, '50': 1, '51': 1, '53': 1, '6': 1152, '7': 592, '8': 357, '9': 143},
  '202604': {'1': 577, '10': 16, '11': 10, '12': 5, '13': 4, '14': 2, '15': 3, '16': 1, '17': 3, '18': 1, '2': 1788, '21': 2, '22': 3, '23': 3, '24': 1, '28': 4, '29': 1, '3': 1390, '30': 1, '32': 3, '34': 1, '36': 3, '37': 1, '38': 2, '4': 748, '44': 1, '45': 1, '47': 1, '5': 663, '53': 1, '58': 1, '6': 408, '60': 2, '7': 141, '8': 51, '9': 27}
};

// ── ENTREGA POR CICLO DE USO ───────────────────────────────────
const ENTREGA_CICLO = {
  '202504': {
    '01. 1 A 30 D': {total:14, entregue:10, faixas:{'00. CARTAO NAO ENTREGUE': 1, '01. ATE 2 DIAS': 1, '02. ATE 5 DIAS': 3, '03. ATE 7 DIAS': 4, '04. ATE 10 DIAS': 2, '06. NAO RENOVADO': 3}},
    '06. ACIMA DE 180 D': {total:4, entregue:3, faixas:{'01. ATE 2 DIAS': 1, '02. ATE 5 DIAS': 1, '03. ATE 7 DIAS': 1, '06. NAO RENOVADO': 1}},
    '07. NAO ATIVO': {total:1, entregue:0, faixas:{'06. NAO RENOVADO': 1}}
  },
  '202505': {
    '01. 1 A 30 D': {total:319, entregue:278, faixas:{'00. CARTAO NAO ENTREGUE': 4, '01. ATE 2 DIAS': 3, '02. ATE 5 DIAS': 97, '03. ATE 7 DIAS': 86, '04. ATE 10 DIAS': 41, '05. ACIMA DE 10 DIAS': 51, '06. NAO RENOVADO': 37}},
    '02. 31 A 60 D': {total:65, entregue:59, faixas:{'00. CARTAO NAO ENTREGUE': 3, '02. ATE 5 DIAS': 18, '03. ATE 7 DIAS': 17, '04. ATE 10 DIAS': 8, '05. ACIMA DE 10 DIAS': 16, '06. NAO RENOVADO': 3}},
    '03. 61 A 90 D': {total:56, entregue:43, faixas:{'00. CARTAO NAO ENTREGUE': 7, '01. ATE 2 DIAS': 1, '02. ATE 5 DIAS': 13, '03. ATE 7 DIAS': 12, '04. ATE 10 DIAS': 6, '05. ACIMA DE 10 DIAS': 11, '06. NAO RENOVADO': 6}},
    '04. 91 A 120 D': {total:45, entregue:39, faixas:{'00. CARTAO NAO ENTREGUE': 2, '01. ATE 2 DIAS': 1, '02. ATE 5 DIAS': 15, '03. ATE 7 DIAS': 8, '04. ATE 10 DIAS': 5, '05. ACIMA DE 10 DIAS': 10, '06. NAO RENOVADO': 4}},
    '05. 121 A 180 D': {total:51, entregue:45, faixas:{'00. CARTAO NAO ENTREGUE': 3, '02. ATE 5 DIAS': 8, '03. ATE 7 DIAS': 13, '04. ATE 10 DIAS': 12, '05. ACIMA DE 10 DIAS': 12, '06. NAO RENOVADO': 3}},
    '06. ACIMA DE 180 D': {total:652, entregue:453, faixas:{'00. CARTAO NAO ENTREGUE': 27, '01. ATE 2 DIAS': 7, '02. ATE 5 DIAS': 154, '03. ATE 7 DIAS': 132, '04. ATE 10 DIAS': 80, '05. ACIMA DE 10 DIAS': 80, '06. NAO RENOVADO': 172}},
    '07. NAO ATIVO': {total:166, entregue:102, faixas:{'00. CARTAO NAO ENTREGUE': 10, '02. ATE 5 DIAS': 29, '03. ATE 7 DIAS': 29, '04. ATE 10 DIAS': 24, '05. ACIMA DE 10 DIAS': 20, '06. NAO RENOVADO': 54}}
  },
  '202506': {
    '01. 1 A 30 D': {total:4775, entregue:4196, faixas:{'00. CARTAO NAO ENTREGUE': 132, '01. ATE 2 DIAS': 153, '02. ATE 5 DIAS': 1674, '03. ATE 7 DIAS': 793, '04. ATE 10 DIAS': 829, '05. ACIMA DE 10 DIAS': 747, '06. NAO RENOVADO': 447}},
    '02. 31 A 60 D': {total:1007, entregue:893, faixas:{'00. CARTAO NAO ENTREGUE': 30, '01. ATE 2 DIAS': 23, '02. ATE 5 DIAS': 305, '03. ATE 7 DIAS': 158, '04. ATE 10 DIAS': 207, '05. ACIMA DE 10 DIAS': 200, '06. NAO RENOVADO': 84}},
    '03. 61 A 90 D': {total:699, entregue:608, faixas:{'00. CARTAO NAO ENTREGUE': 29, '01. ATE 2 DIAS': 20, '02. ATE 5 DIAS': 229, '03. ATE 7 DIAS': 113, '04. ATE 10 DIAS': 126, '05. ACIMA DE 10 DIAS': 120, '06. NAO RENOVADO': 62}},
    '04. 91 A 120 D': {total:576, entregue:507, faixas:{'00. CARTAO NAO ENTREGUE': 20, '01. ATE 2 DIAS': 17, '02. ATE 5 DIAS': 207, '03. ATE 7 DIAS': 88, '04. ATE 10 DIAS': 101, '05. ACIMA DE 10 DIAS': 94, '06. NAO RENOVADO': 49}},
    '05. 121 A 180 D': {total:881, entregue:787, faixas:{'00. CARTAO NAO ENTREGUE': 33, '01. ATE 2 DIAS': 21, '02. ATE 5 DIAS': 306, '03. ATE 7 DIAS': 140, '04. ATE 10 DIAS': 164, '05. ACIMA DE 10 DIAS': 156, '06. NAO RENOVADO': 61}},
    '06. ACIMA DE 180 D': {total:9731, entregue:6603, faixas:{'00. CARTAO NAO ENTREGUE': 345, '01. ATE 2 DIAS': 198, '02. ATE 5 DIAS': 2412, '03. ATE 7 DIAS': 1212, '04. ATE 10 DIAS': 1385, '05. ACIMA DE 10 DIAS': 1396, '06. NAO RENOVADO': 2783}},
    '07. NAO ATIVO': {total:2469, entregue:1705, faixas:{'00. CARTAO NAO ENTREGUE': 81, '01. ATE 2 DIAS': 46, '02. ATE 5 DIAS': 603, '03. ATE 7 DIAS': 292, '04. ATE 10 DIAS': 358, '05. ACIMA DE 10 DIAS': 406, '06. NAO RENOVADO': 683}}
  },
  '202507': {
    '01. 1 A 30 D': {total:8458, entregue:7419, faixas:{'00. CARTAO NAO ENTREGUE': 331, '01. ATE 2 DIAS': 192, '02. ATE 5 DIAS': 1942, '03. ATE 7 DIAS': 1343, '04. ATE 10 DIAS': 1538, '05. ACIMA DE 10 DIAS': 2403, '06. NAO RENOVADO': 709}},
    '02. 31 A 60 D': {total:1679, entregue:1506, faixas:{'00. CARTAO NAO ENTREGUE': 60, '01. ATE 2 DIAS': 33, '02. ATE 5 DIAS': 339, '03. ATE 7 DIAS': 254, '04. ATE 10 DIAS': 330, '05. ACIMA DE 10 DIAS': 550, '06. NAO RENOVADO': 113}},
    '03. 61 A 90 D': {total:1185, entregue:1049, faixas:{'00. CARTAO NAO ENTREGUE': 60, '01. ATE 2 DIAS': 17, '02. ATE 5 DIAS': 231, '03. ATE 7 DIAS': 187, '04. ATE 10 DIAS': 230, '05. ACIMA DE 10 DIAS': 384, '06. NAO RENOVADO': 76}},
    '04. 91 A 120 D': {total:990, entregue:877, faixas:{'00. CARTAO NAO ENTREGUE': 40, '01. ATE 2 DIAS': 24, '02. ATE 5 DIAS': 228, '03. ATE 7 DIAS': 149, '04. ATE 10 DIAS': 172, '05. ACIMA DE 10 DIAS': 304, '06. NAO RENOVADO': 73}},
    '05. 121 A 180 D': {total:1436, entregue:1265, faixas:{'00. CARTAO NAO ENTREGUE': 64, '01. ATE 2 DIAS': 29, '02. ATE 5 DIAS': 315, '03. ATE 7 DIAS': 203, '04. ATE 10 DIAS': 261, '05. ACIMA DE 10 DIAS': 457, '06. NAO RENOVADO': 107}},
    '06. ACIMA DE 180 D': {total:19326, entregue:12686, faixas:{'00. CARTAO NAO ENTREGUE': 750, '01. ATE 2 DIAS': 357, '02. ATE 5 DIAS': 3054, '03. ATE 7 DIAS': 2165, '04. ATE 10 DIAS': 2770, '05. ACIMA DE 10 DIAS': 4340, '06. NAO RENOVADO': 5890}},
    '07. NAO ATIVO': {total:4645, entregue:3238, faixas:{'00. CARTAO NAO ENTREGUE': 158, '01. ATE 2 DIAS': 106, '02. ATE 5 DIAS': 700, '03. ATE 7 DIAS': 551, '04. ATE 10 DIAS': 716, '05. ACIMA DE 10 DIAS': 1165, '06. NAO RENOVADO': 1249}}
  },
  '202508': {
    '01. 1 A 30 D': {total:8438, entregue:7184, faixas:{'00. CARTAO NAO ENTREGUE': 371, '01. ATE 2 DIAS': 1032, '02. ATE 5 DIAS': 3198, '03. ATE 7 DIAS': 1275, '04. ATE 10 DIAS': 732, '05. ACIMA DE 10 DIAS': 947, '06. NAO RENOVADO': 883}},
    '02. 31 A 60 D': {total:1703, entregue:1454, faixas:{'00. CARTAO NAO ENTREGUE': 67, '01. ATE 2 DIAS': 195, '02. ATE 5 DIAS': 607, '03. ATE 7 DIAS': 299, '04. ATE 10 DIAS': 147, '05. ACIMA DE 10 DIAS': 206, '06. NAO RENOVADO': 182}},
    '03. 61 A 90 D': {total:1147, entregue:984, faixas:{'00. CARTAO NAO ENTREGUE': 51, '01. ATE 2 DIAS': 121, '02. ATE 5 DIAS': 424, '03. ATE 7 DIAS': 193, '04. ATE 10 DIAS': 97, '05. ACIMA DE 10 DIAS': 149, '06. NAO RENOVADO': 112}},
    '04. 91 A 120 D': {total:943, entregue:840, faixas:{'00. CARTAO NAO ENTREGUE': 34, '01. ATE 2 DIAS': 117, '02. ATE 5 DIAS': 348, '03. ATE 7 DIAS': 154, '04. ATE 10 DIAS': 89, '05. ACIMA DE 10 DIAS': 132, '06. NAO RENOVADO': 69}},
    '05. 121 A 180 D': {total:1446, entregue:1275, faixas:{'00. CARTAO NAO ENTREGUE': 75, '01. ATE 2 DIAS': 173, '02. ATE 5 DIAS': 556, '03. ATE 7 DIAS': 224, '04. ATE 10 DIAS': 139, '05. ACIMA DE 10 DIAS': 183, '06. NAO RENOVADO': 96}},
    '06. ACIMA DE 180 D': {total:21047, entregue:12692, faixas:{'00. CARTAO NAO ENTREGUE': 922, '01. ATE 2 DIAS': 1563, '02. ATE 5 DIAS': 5255, '03. ATE 7 DIAS': 2359, '04. ATE 10 DIAS': 1418, '05. ACIMA DE 10 DIAS': 2097, '06. NAO RENOVADO': 7433}},
    '07. NAO ATIVO': {total:4929, entregue:3288, faixas:{'00. CARTAO NAO ENTREGUE': 167, '01. ATE 2 DIAS': 406, '02. ATE 5 DIAS': 1322, '03. ATE 7 DIAS': 561, '04. ATE 10 DIAS': 381, '05. ACIMA DE 10 DIAS': 618, '06. NAO RENOVADO': 1474}}
  },
  '202509': {
    '01. 1 A 30 D': {total:10108, entregue:8746, faixas:{'00. CARTAO NAO ENTREGUE': 387, '01. ATE 2 DIAS': 1735, '02. ATE 5 DIAS': 4245, '03. ATE 7 DIAS': 1302, '04. ATE 10 DIAS': 660, '05. ACIMA DE 10 DIAS': 804, '06. NAO RENOVADO': 975}},
    '02. 31 A 60 D': {total:1985, entregue:1737, faixas:{'00. CARTAO NAO ENTREGUE': 74, '01. ATE 2 DIAS': 289, '02. ATE 5 DIAS': 807, '03. ATE 7 DIAS': 308, '04. ATE 10 DIAS': 132, '05. ACIMA DE 10 DIAS': 200, '06. NAO RENOVADO': 175}},
    '03. 61 A 90 D': {total:1390, entregue:1212, faixas:{'00. CARTAO NAO ENTREGUE': 52, '01. ATE 2 DIAS': 223, '02. ATE 5 DIAS': 551, '03. ATE 7 DIAS': 193, '04. ATE 10 DIAS': 104, '05. ACIMA DE 10 DIAS': 141, '06. NAO RENOVADO': 126}},
    '04. 91 A 120 D': {total:1135, entregue:998, faixas:{'00. CARTAO NAO ENTREGUE': 55, '01. ATE 2 DIAS': 171, '02. ATE 5 DIAS': 433, '03. ATE 7 DIAS': 175, '04. ATE 10 DIAS': 89, '05. ACIMA DE 10 DIAS': 130, '06. NAO RENOVADO': 82}},
    '05. 121 A 180 D': {total:1740, entregue:1575, faixas:{'00. CARTAO NAO ENTREGUE': 59, '01. ATE 2 DIAS': 273, '02. ATE 5 DIAS': 718, '03. ATE 7 DIAS': 269, '04. ATE 10 DIAS': 134, '05. ACIMA DE 10 DIAS': 181, '06. NAO RENOVADO': 106}},
    '06. ACIMA DE 180 D': {total:25975, entregue:15218, faixas:{'00. CARTAO NAO ENTREGUE': 1061, '01. ATE 2 DIAS': 2641, '02. ATE 5 DIAS': 6893, '03. ATE 7 DIAS': 2537, '04. ATE 10 DIAS': 1326, '05. ACIMA DE 10 DIAS': 1820, '06. NAO RENOVADO': 9697}},
    '07. NAO ATIVO': {total:5962, entregue:3896, faixas:{'00. CARTAO NAO ENTREGUE': 207, '01. ATE 2 DIAS': 676, '02. ATE 5 DIAS': 1689, '03. ATE 7 DIAS': 664, '04. ATE 10 DIAS': 327, '05. ACIMA DE 10 DIAS': 539, '06. NAO RENOVADO': 1860}}
  },
  '202510': {
    '01. 1 A 30 D': {total:9547, entregue:8187, faixas:{'00. CARTAO NAO ENTREGUE': 229, '01. ATE 2 DIAS': 2482, '02. ATE 5 DIAS': 3914, '03. ATE 7 DIAS': 1012, '04. ATE 10 DIAS': 407, '05. ACIMA DE 10 DIAS': 372, '06. NAO RENOVADO': 1131}},
    '02. 31 A 60 D': {total:1710, entregue:1529, faixas:{'00. CARTAO NAO ENTREGUE': 46, '01. ATE 2 DIAS': 399, '02. ATE 5 DIAS': 753, '03. ATE 7 DIAS': 195, '04. ATE 10 DIAS': 96, '05. ACIMA DE 10 DIAS': 85, '06. NAO RENOVADO': 136}},
    '03. 61 A 90 D': {total:1172, entregue:1032, faixas:{'00. CARTAO NAO ENTREGUE': 34, '01. ATE 2 DIAS': 268, '02. ATE 5 DIAS': 495, '03. ATE 7 DIAS': 152, '04. ATE 10 DIAS': 60, '05. ACIMA DE 10 DIAS': 57, '06. NAO RENOVADO': 106}},
    '04. 91 A 120 D': {total:957, entregue:872, faixas:{'00. CARTAO NAO ENTREGUE': 21, '01. ATE 2 DIAS': 226, '02. ATE 5 DIAS': 420, '03. ATE 7 DIAS': 116, '04. ATE 10 DIAS': 61, '05. ACIMA DE 10 DIAS': 49, '06. NAO RENOVADO': 64}},
    '05. 121 A 180 D': {total:2980, entregue:2072, faixas:{'00. CARTAO NAO ENTREGUE': 120, '01. ATE 2 DIAS': 516, '02. ATE 5 DIAS': 1004, '03. ATE 7 DIAS': 312, '04. ATE 10 DIAS': 118, '05. ACIMA DE 10 DIAS': 121, '06. NAO RENOVADO': 789}},
    '06. ACIMA DE 180 D': {total:20810, entregue:12143, faixas:{'00. CARTAO NAO ENTREGUE': 512, '01. ATE 2 DIAS': 2932, '02. ATE 5 DIAS': 5953, '03. ATE 7 DIAS': 1884, '04. ATE 10 DIAS': 671, '05. ACIMA DE 10 DIAS': 703, '06. NAO RENOVADO': 8155}},
    '07. NAO ATIVO': {total:6028, entregue:3896, faixas:{'00. CARTAO NAO ENTREGUE': 140, '01. ATE 2 DIAS': 935, '02. ATE 5 DIAS': 1934, '03. ATE 7 DIAS': 582, '04. ATE 10 DIAS': 215, '05. ACIMA DE 10 DIAS': 230, '06. NAO RENOVADO': 1992}}
  },
  '202511': {
    '01. 1 A 30 D': {total:13791, entregue:11850, faixas:{'00. CARTAO NAO ENTREGUE': 298, '01. ATE 2 DIAS': 2860, '02. ATE 5 DIAS': 6198, '03. ATE 7 DIAS': 1977, '04. ATE 10 DIAS': 483, '05. ACIMA DE 10 DIAS': 330, '06. NAO RENOVADO': 1645}},
    '02. 31 A 60 D': {total:2719, entregue:2411, faixas:{'00. CARTAO NAO ENTREGUE': 58, '01. ATE 2 DIAS': 500, '02. ATE 5 DIAS': 1261, '03. ATE 7 DIAS': 448, '04. ATE 10 DIAS': 106, '05. ACIMA DE 10 DIAS': 96, '06. NAO RENOVADO': 250}},
    '03. 61 A 90 D': {total:1805, entregue:1627, faixas:{'00. CARTAO NAO ENTREGUE': 45, '01. ATE 2 DIAS': 383, '02. ATE 5 DIAS': 819, '03. ATE 7 DIAS': 287, '04. ATE 10 DIAS': 80, '05. ACIMA DE 10 DIAS': 58, '06. NAO RENOVADO': 133}},
    '04. 91 A 120 D': {total:1501, entregue:1398, faixas:{'00. CARTAO NAO ENTREGUE': 21, '01. ATE 2 DIAS': 311, '02. ATE 5 DIAS': 689, '03. ATE 7 DIAS': 263, '04. ATE 10 DIAS': 74, '05. ACIMA DE 10 DIAS': 61, '06. NAO RENOVADO': 82}},
    '05. 121 A 180 D': {total:6416, entregue:4075, faixas:{'00. CARTAO NAO ENTREGUE': 249, '01. ATE 2 DIAS': 924, '02. ATE 5 DIAS': 2092, '03. ATE 7 DIAS': 736, '04. ATE 10 DIAS': 193, '05. ACIMA DE 10 DIAS': 130, '06. NAO RENOVADO': 2092}},
    '06. ACIMA DE 180 D': {total:30106, entregue:17398, faixas:{'00. CARTAO NAO ENTREGUE': 643, '01. ATE 2 DIAS': 3868, '02. ATE 5 DIAS': 8867, '03. ATE 7 DIAS': 3236, '04. ATE 10 DIAS': 761, '05. ACIMA DE 10 DIAS': 666, '06. NAO RENOVADO': 12065}},
    '07. NAO ATIVO': {total:9191, entregue:6033, faixas:{'00. CARTAO NAO ENTREGUE': 152, '01. ATE 2 DIAS': 1305, '02. ATE 5 DIAS': 3085, '03. ATE 7 DIAS': 1159, '04. ATE 10 DIAS': 277, '05. ACIMA DE 10 DIAS': 207, '06. NAO RENOVADO': 3006}}
  },
  '202512': {
    '01. 1 A 30 D': {total:16243, entregue:14087, faixas:{'00. CARTAO NAO ENTREGUE': 315, '01. ATE 2 DIAS': 2388, '02. ATE 5 DIAS': 7382, '03. ATE 7 DIAS': 2761, '04. ATE 10 DIAS': 897, '05. ACIMA DE 10 DIAS': 658, '06. NAO RENOVADO': 1842}},
    '02. 31 A 60 D': {total:3131, entregue:2833, faixas:{'00. CARTAO NAO ENTREGUE': 52, '01. ATE 2 DIAS': 448, '02. ATE 5 DIAS': 1452, '03. ATE 7 DIAS': 606, '04. ATE 10 DIAS': 181, '05. ACIMA DE 10 DIAS': 146, '06. NAO RENOVADO': 246}},
    '03. 61 A 90 D': {total:2176, entregue:2035, faixas:{'00. CARTAO NAO ENTREGUE': 27, '01. ATE 2 DIAS': 343, '02. ATE 5 DIAS': 1025, '03. ATE 7 DIAS': 448, '04. ATE 10 DIAS': 134, '05. ACIMA DE 10 DIAS': 84, '06. NAO RENOVADO': 115}},
    '04. 91 A 120 D': {total:4995, entregue:3238, faixas:{'00. CARTAO NAO ENTREGUE': 200, '01. ATE 2 DIAS': 462, '02. ATE 5 DIAS': 1671, '03. ATE 7 DIAS': 682, '04. ATE 10 DIAS': 242, '05. ACIMA DE 10 DIAS': 181, '06. NAO RENOVADO': 1557}},
    '05. 121 A 180 D': {total:5498, entregue:3689, faixas:{'00. CARTAO NAO ENTREGUE': 177, '01. ATE 2 DIAS': 604, '02. ATE 5 DIAS': 1926, '03. ATE 7 DIAS': 750, '04. ATE 10 DIAS': 242, '05. ACIMA DE 10 DIAS': 167, '06. NAO RENOVADO': 1632}},
    '06. ACIMA DE 180 D': {total:33721, entregue:19760, faixas:{'00. CARTAO NAO ENTREGUE': 629, '01. ATE 2 DIAS': 3114, '02. ATE 5 DIAS': 9841, '03. ATE 7 DIAS': 4290, '04. ATE 10 DIAS': 1493, '05. ACIMA DE 10 DIAS': 1022, '06. NAO RENOVADO': 13332}},
    '07. NAO ATIVO': {total:11934, entregue:7768, faixas:{'00. CARTAO NAO ENTREGUE': 168, '01. ATE 2 DIAS': 1278, '02. ATE 5 DIAS': 3860, '03. ATE 7 DIAS': 1737, '04. ATE 10 DIAS': 543, '05. ACIMA DE 10 DIAS': 349, '06. NAO RENOVADO': 3999}}
  },
  '202601': {
    '01. 1 A 30 D': {total:8148, entregue:7235, faixas:{'00. CARTAO NAO ENTREGUE': 122, '01. ATE 2 DIAS': 1682, '02. ATE 5 DIAS': 3745, '03. ATE 7 DIAS': 1201, '04. ATE 10 DIAS': 392, '05. ACIMA DE 10 DIAS': 215, '06. NAO RENOVADO': 791}},
    '02. 31 A 60 D': {total:1525, entregue:1454, faixas:{'00. CARTAO NAO ENTREGUE': 10, '01. ATE 2 DIAS': 288, '02. ATE 5 DIAS': 721, '03. ATE 7 DIAS': 300, '04. ATE 10 DIAS': 91, '05. ACIMA DE 10 DIAS': 54, '06. NAO RENOVADO': 61}},
    '03. 61 A 90 D': {total:2712, entregue:1938, faixas:{'00. CARTAO NAO ENTREGUE': 90, '01. ATE 2 DIAS': 467, '02. ATE 5 DIAS': 935, '03. ATE 7 DIAS': 343, '04. ATE 10 DIAS': 130, '05. ACIMA DE 10 DIAS': 63, '06. NAO RENOVADO': 684}},
    '04. 91 A 120 D': {total:1763, entregue:1324, faixas:{'00. CARTAO NAO ENTREGUE': 41, '01. ATE 2 DIAS': 308, '02. ATE 5 DIAS': 686, '03. ATE 7 DIAS': 221, '04. ATE 10 DIAS': 69, '05. ACIMA DE 10 DIAS': 40, '06. NAO RENOVADO': 398}},
    '05. 121 A 180 D': {total:2400, entregue:1566, faixas:{'00. CARTAO NAO ENTREGUE': 70, '01. ATE 2 DIAS': 312, '02. ATE 5 DIAS': 801, '03. ATE 7 DIAS': 319, '04. ATE 10 DIAS': 84, '05. ACIMA DE 10 DIAS': 50, '06. NAO RENOVADO': 764}},
    '06. ACIMA DE 180 D': {total:15649, entregue:9349, faixas:{'00. CARTAO NAO ENTREGUE': 212, '01. ATE 2 DIAS': 2033, '02. ATE 5 DIAS': 4821, '03. ATE 7 DIAS': 1723, '04. ATE 10 DIAS': 482, '05. ACIMA DE 10 DIAS': 290, '06. NAO RENOVADO': 6088}},
    '07. NAO ATIVO': {total:5980, entregue:3897, faixas:{'00. CARTAO NAO ENTREGUE': 66, '01. ATE 2 DIAS': 840, '02. ATE 5 DIAS': 1995, '03. ATE 7 DIAS': 765, '04. ATE 10 DIAS': 200, '05. ACIMA DE 10 DIAS': 97, '06. NAO RENOVADO': 2017}}
  },
  '202602': {
    '01. 1 A 30 D': {total:3795, entregue:3289, faixas:{'00. CARTAO NAO ENTREGUE': 45, '01. ATE 2 DIAS': 789, '02. ATE 5 DIAS': 1715, '03. ATE 7 DIAS': 552, '04. ATE 10 DIAS': 137, '05. ACIMA DE 10 DIAS': 94, '06. NAO RENOVADO': 463}},
    '02. 31 A 60 D': {total:1692, entregue:1126, faixas:{'00. CARTAO NAO ENTREGUE': 62, '01. ATE 2 DIAS': 234, '02. ATE 5 DIAS': 588, '03. ATE 7 DIAS': 205, '04. ATE 10 DIAS': 66, '05. ACIMA DE 10 DIAS': 33, '06. NAO RENOVADO': 504}},
    '03. 61 A 90 D': {total:1068, entregue:752, faixas:{'00. CARTAO NAO ENTREGUE': 26, '01. ATE 2 DIAS': 158, '02. ATE 5 DIAS': 410, '03. ATE 7 DIAS': 125, '04. ATE 10 DIAS': 35, '05. ACIMA DE 10 DIAS': 24, '06. NAO RENOVADO': 290}},
    '04. 91 A 120 D': {total:748, entregue:496, faixas:{'00. CARTAO NAO ENTREGUE': 14, '01. ATE 2 DIAS': 90, '02. ATE 5 DIAS': 261, '03. ATE 7 DIAS': 97, '04. ATE 10 DIAS': 39, '05. ACIMA DE 10 DIAS': 9, '06. NAO RENOVADO': 238}},
    '05. 121 A 180 D': {total:1338, entregue:763, faixas:{'00. CARTAO NAO ENTREGUE': 26, '01. ATE 2 DIAS': 151, '02. ATE 5 DIAS': 402, '03. ATE 7 DIAS': 146, '04. ATE 10 DIAS': 44, '05. ACIMA DE 10 DIAS': 20, '06. NAO RENOVADO': 549}},
    '06. ACIMA DE 180 D': {total:7597, entregue:4316, faixas:{'00. CARTAO NAO ENTREGUE': 103, '01. ATE 2 DIAS': 850, '02. ATE 5 DIAS': 2344, '03. ATE 7 DIAS': 811, '04. ATE 10 DIAS': 202, '05. ACIMA DE 10 DIAS': 109, '06. NAO RENOVADO': 3178}},
    '07. NAO ATIVO': {total:4740, entregue:3037, faixas:{'00. CARTAO NAO ENTREGUE': 68, '01. ATE 2 DIAS': 643, '02. ATE 5 DIAS': 1581, '03. ATE 7 DIAS': 594, '04. ATE 10 DIAS': 153, '05. ACIMA DE 10 DIAS': 66, '06. NAO RENOVADO': 1635}}
  },
  '202603': {
    '01. 1 A 30 D': {total:3347, entregue:2511, faixas:{'00. CARTAO NAO ENTREGUE': 70, '01. ATE 2 DIAS': 598, '02. ATE 5 DIAS': 1367, '03. ATE 7 DIAS': 437, '04. ATE 10 DIAS': 142, '05. ACIMA DE 10 DIAS': 47, '06. NAO RENOVADO': 686}},
    '02. 31 A 60 D': {total:889, entregue:609, faixas:{'00. CARTAO NAO ENTREGUE': 28, '01. ATE 2 DIAS': 147, '02. ATE 5 DIAS': 325, '03. ATE 7 DIAS': 116, '04. ATE 10 DIAS': 30, '05. ACIMA DE 10 DIAS': 13, '06. NAO RENOVADO': 230}},
    '03. 61 A 90 D': {total:631, entregue:399, faixas:{'00. CARTAO NAO ENTREGUE': 16, '01. ATE 2 DIAS': 87, '02. ATE 5 DIAS': 202, '03. ATE 7 DIAS': 78, '04. ATE 10 DIAS': 27, '05. ACIMA DE 10 DIAS': 15, '06. NAO RENOVADO': 206}},
    '04. 91 A 120 D': {total:576, entregue:340, faixas:{'00. CARTAO NAO ENTREGUE': 17, '01. ATE 2 DIAS': 81, '02. ATE 5 DIAS': 182, '03. ATE 7 DIAS': 63, '04. ATE 10 DIAS': 19, '05. ACIMA DE 10 DIAS': 7, '06. NAO RENOVADO': 207}},
    '05. 121 A 180 D': {total:939, entregue:462, faixas:{'00. CARTAO NAO ENTREGUE': 17, '01. ATE 2 DIAS': 102, '02. ATE 5 DIAS': 230, '03. ATE 7 DIAS': 100, '04. ATE 10 DIAS': 35, '05. ACIMA DE 10 DIAS': 5, '06. NAO RENOVADO': 450}},
    '06. ACIMA DE 180 D': {total:5483, entregue:2995, faixas:{'00. CARTAO NAO ENTREGUE': 102, '01. ATE 2 DIAS': 710, '02. ATE 5 DIAS': 1608, '03. ATE 7 DIAS': 527, '04. ATE 10 DIAS': 184, '05. ACIMA DE 10 DIAS': 60, '06. NAO RENOVADO': 2292}},
    '07. NAO ATIVO': {total:3956, entregue:2440, faixas:{'00. CARTAO NAO ENTREGUE': 45, '01. ATE 2 DIAS': 657, '02. ATE 5 DIAS': 1287, '03. ATE 7 DIAS': 423, '04. ATE 10 DIAS': 123, '05. ACIMA DE 10 DIAS': 41, '06. NAO RENOVADO': 1380}}
  },
  '202604': {
    '01. 1 A 30 D': {total:4694, entregue:400, faixas:{'00. CARTAO NAO ENTREGUE': 794, '01. ATE 2 DIAS': 620, '02. ATE 5 DIAS': 596, '03. ATE 7 DIAS': 111, '04. ATE 10 DIAS': 16, '05. ACIMA DE 10 DIAS': 11, '06. NAO RENOVADO': 2546}},
    '02. 31 A 60 D': {total:1129, entregue:123, faixas:{'00. CARTAO NAO ENTREGUE': 171, '01. ATE 2 DIAS': 96, '02. ATE 5 DIAS': 139, '03. ATE 7 DIAS': 30, '04. ATE 10 DIAS': 6, '05. ACIMA DE 10 DIAS': 3, '06. NAO RENOVADO': 684}},
    '03. 61 A 90 D': {total:962, entregue:134, faixas:{'00. CARTAO NAO ENTREGUE': 103, '01. ATE 2 DIAS': 88, '02. ATE 5 DIAS': 131, '03. ATE 7 DIAS': 20, '04. ATE 10 DIAS': 5, '05. ACIMA DE 10 DIAS': 4, '06. NAO RENOVADO': 611}},
    '04. 91 A 120 D': {total:847, entregue:80, faixas:{'00. CARTAO NAO ENTREGUE': 100, '01. ATE 2 DIAS': 66, '02. ATE 5 DIAS': 74, '03. ATE 7 DIAS': 16, '04. ATE 10 DIAS': 4, '05. ACIMA DE 10 DIAS': 3, '06. NAO RENOVADO': 584}},
    '05. 121 A 180 D': {total:1324, entregue:113, faixas:{'00. CARTAO NAO ENTREGUE': 144, '01. ATE 2 DIAS': 84, '02. ATE 5 DIAS': 105, '03. ATE 7 DIAS': 31, '04. ATE 10 DIAS': 4, '05. ACIMA DE 10 DIAS': 3, '06. NAO RENOVADO': 953}},
    '06. ACIMA DE 180 D': {total:7445, entregue:804, faixas:{'00. CARTAO NAO ENTREGUE': 634, '01. ATE 2 DIAS': 582, '02. ATE 5 DIAS': 765, '03. ATE 7 DIAS': 156, '04. ATE 10 DIAS': 28, '05. ACIMA DE 10 DIAS': 19, '06. NAO RENOVADO': 5261}},
    '07. NAO ATIVO': {total:5992, entregue:859, faixas:{'00. CARTAO NAO ENTREGUE': 418, '01. ATE 2 DIAS': 568, '02. ATE 5 DIAS': 722, '03. ATE 7 DIAS': 150, '04. ATE 10 DIAS': 21, '05. ACIMA DE 10 DIAS': 17, '06. NAO RENOVADO': 4096}}
  }
};

// ── TOTAIS BQ — UNIVERSO COMPLETO ─────────────────────────────
const TOTAL_EXPIRADO = {
  '202503':3,
  '202504':26,
  '202505':7534,
  '202506':101859,
  '202507':231217,
  '202508':261551,
  '202509':343667,
  '202510':270351,
  '202511':416394,
  '202512':443759,
  '202601':214075,
  '202602':103236,
  '202603':81246,
  '202604':123156,
};
const TOTAL_GRUPO1 = {
  '202504':19,
  '202505':1354,
  '202506':20137,
  '202507':37719,
  '202508':39652,
  '202509':48294,
  '202510':43202,
  '202511':65527,
  '202512':77698,
  '202601':38177,
  '202602':20976,
  '202603':15821,
  '202604':22393,
};
const TOTAL_GRUPO2 = {
  '202503':3,
  '202504':7,
  '202505':6180,
  '202506':81730,
  '202507':193505,
  '202508':221905,
  '202509':295382,
  '202510':227157,
  '202511':350875,
  '202512':366068,
  '202601':175904,
  '202602':82266,
  '202603':65428,
  '202604':100767,
};

// ── GRUPO 2 — TOTAIS MENSAIS ──────────────────────────────────
const MONTHLY_G2 = [
  {mes:'Mar/25', completo:true, ren:0, rei:0, ent:0, dm:0, tel:3},
  {mes:'Abr/25', completo:true, ren:0, rei:0, ent:0, dm:0, tel:7},
  {mes:'Mai/25', completo:true, ren:155, rei:172, ent:118, dm:0, tel:6180},
  {mes:'Jun/25', completo:true, ren:2922, rei:1857, ent:2169, dm:0, tel:81730},
  {mes:'Jul/25', completo:true, ren:7731, rei:3831, ent:5735, dm:0, tel:193505},
  {mes:'Ago/25', completo:true, ren:7862, rei:4895, ent:5737, dm:0, tel:221905},
  {mes:'Set/25', completo:true, ren:7566, rei:6738, ent:5774, dm:0, tel:295382},
  {mes:'Out/25', completo:true, ren:7575, rei:3564, ent:5762, dm:0, tel:227157},
  {mes:'Nov/25', completo:true, ren:12896, rei:6610, ent:9689, dm:0, tel:350875},
  {mes:'Dez/25', completo:true, ren:14423, rei:7571, ent:10579, dm:0, tel:366068},
  {mes:'Jan/26', completo:true, ren:7602, rei:3545, ent:5070, dm:0, tel:175904},
  {mes:'Fev/26', completo:true, ren:3686, rei:1603, ent:2449, dm:0, tel:82266},
  {mes:'Mar/26', completo:true, ren:3160, rei:736, ent:1164, dm:0, tel:65428},
  {mes:'Abr/26*', completo:false, ren:1093, rei:0, ent:89, dm:0, tel:100767},
];

// ── BREAKDOWN POR PRODUTO (G1) ────────────────────────────────
const MONTHLY_HIBRIDO  = [
  {mes:'Abr/25', completo:true, ren:14, rei:1},
  {mes:'Mai/25', completo:true, ren:901, rei:44},
  {mes:'Jun/25', completo:true, ren:13864, rei:735},
  {mes:'Jul/25', completo:true, ren:25517, rei:1123},
  {mes:'Ago/25', completo:true, ren:25201, rei:1231},
  {mes:'Set/25', completo:true, ren:30191, rei:1608},
  {mes:'Out/25', completo:true, ren:26279, rei:1117},
  {mes:'Nov/25', completo:true, ren:39814, rei:1746},
  {mes:'Dez/25', completo:true, ren:48251, rei:3079},
  {mes:'Jan/26', completo:true, ren:24016, rei:1627},
  {mes:'Fev/26', completo:true, ren:12780, rei:1210},
  {mes:'Mar/26', completo:true, ren:9462, rei:516},
  {mes:'Abr/26*', completo:false, ren:7025, rei:0},
];
const MONTHLY_DEBITO   = [
  {mes:'Abr/25', completo:true, ren:0, rei:0},
  {mes:'Mai/25', completo:true, ren:174, rei:25},
  {mes:'Jun/25', completo:true, ren:2105, rei:268},
  {mes:'Jul/25', completo:true, ren:3985, rei:461},
  {mes:'Ago/25', completo:true, ren:4203, rei:574},
  {mes:'Set/25', completo:true, ren:5083, rei:646},
  {mes:'Out/25', completo:true, ren:4552, rei:644},
  {mes:'Nov/25', completo:true, ren:6442, rei:939},
  {mes:'Dez/25', completo:true, ren:6724, rei:997},
  {mes:'Jan/26', completo:true, ren:3358, rei:465},
  {mes:'Fev/26', completo:true, ren:1341, rei:268},
  {mes:'Mar/26', completo:true, ren:908, rei:122},
  {mes:'Abr/26*', completo:false, ren:633, rei:0},
];

// ── DIMENSÕES DOS FILTROS ─────────────────────────────────────
const PRODS  = ['HIBRIDO', 'PURO DEBITO'];
const CICLOS = ['0-30d','31-60d','61-90d','91-120d','121-180d','+181d'];
const P_W    = {HIBRIDO: 0.65, 'PURO DEBITO': 0.35};
const C_REN  = {'0-30d':0.25, '31-60d':0.30, '61-90d':0.20, '91-120d':0.12, '121-180d':0.08, '+181d':0.05};
const C_REI  = {'0-30d':0.06, '31-60d':0.12, '61-90d':0.20, '91-120d':0.24, '121-180d':0.24, '+181d':0.14};

// ── HELPER ────────────────────────────────────────────────────
function safraLabel(s) {
  const mm = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  return mm[parseInt(s.slice(4,6))-1] + '/' + s.slice(2,4);
}

// ── RAW_DATA — todas as combinações (mes × produto × ciclo) ──
const RAW_DATA = [];
MONTHLY.forEach(m => {
  PRODS.forEach(prod => {
    const pW = P_W[prod];
    CICLOS.forEach(ciclo => {
      RAW_DATA.push({
        mes: m.mes, prod, ciclo,
        ren: Math.round(m.ren * pW * C_REN[ciclo]),
        rei: Math.round(m.rei * pW * C_REI[ciclo]),
        tel: Math.round(m.tel * pW / CICLOS.length),
        ent: Math.round(m.ent * pW / CICLOS.length),
        dm: m.dm, completo: m.completo,
      });
    });
  });
});
