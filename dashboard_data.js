// ═══════════════════════════════════════════════════════════════
//  dashboard_data.js — gerado automaticamente por update_data.py
//  Última atualização: 14/05/2026
//  Fonte: meli-bi-data.SBOX_CREDITSTC.CARTAO_EXPIRADO_ANL_IA
//         meli-bi-data.SBOX_CREDITSTC.CARTAO_EXPIRADO_CUBO_IA
// ═══════════════════════════════════════════════════════════════

// ── DATA DA ÚLTIMA ATUALIZAÇÃO ────────────────────────────────
const DT_ATUALIZACAO = '14/05/2026';

// ── TOTAIS MENSAIS REAIS (BigQuery) ───────────────────────────
const MONTHLY = [
  {mes:'Abr/25', completo:true, ren:14, rei:1, ent:13, dm:5.64, tel:19},
  {mes:'Mai/25', completo:true, ren:1075, rei:66, ent:1019, dm:8.53, tel:1354},
  {mes:'Jun/25', completo:true, ren:15969, rei:994, ent:15300, dm:8.51, tel:20139},
  {mes:'Jul/25', completo:true, ren:29501, rei:1573, ent:28040, dm:9.82, tel:37719},
  {mes:'Ago/25', completo:true, ren:37260, rei:1847, ent:35545, dm:7.65, tel:47962},
  {mes:'Set/25', completo:true, ren:62338, rei:2421, ent:60379, dm:7.07, tel:76547},
  {mes:'Out/25', completo:true, ren:52353, rei:1868, ent:51193, dm:5.29, tel:65817},
  {mes:'Nov/25', completo:true, ren:77360, rei:2862, ent:75830, dm:4.88, tel:98322},
  {mes:'Dez/25', completo:true, ren:86791, rei:4293, ent:85177, dm:5.08, tel:111276},
  {mes:'Jan/26', completo:true, ren:42878, rei:2156, ent:42262, dm:4.68, tel:54281},
  {mes:'Fev/26', completo:true, ren:22476, rei:1513, ent:22134, dm:4.68, tel:29549},
  {mes:'Mar/26', completo:true, ren:17305, rei:1119, ent:17062, dm:4.84, tel:22877},
  {mes:'Abr/26', completo:true, ren:25962, rei:1092, ent:25517, dm:3.98, tel:34155},
  {mes:'Mai/26*', completo:false, ren:35398, rei:0, ent:25678, dm:3.94, tel:55216},
];

// ── SUMÁRIO EXECUTIVO ─────────────────────────────────────────
const SUMARIO_TOTAL = {
  qtde_total:955512,
  qtde_renovados:558744,
  qtde_reemitidos:21805,
  qtde_total_renov:580549,
  qtde_entregue:528877,
  qtde_desbloqueado:452426,
};
const SUMARIO_CICLO = [{"ciclo": "01. 1 A 30 D", "qtde_total": 445706, "qtde_renovados": 257803, "qtde_reemitidos": 13589, "qtde_total_renov": 271392, "qtde_entregue": 244362, "qtde_desbloqueado": 232700}, {"ciclo": "02. 31 A 60 D", "qtde_total": 69775, "qtde_renovados": 42410, "qtde_reemitidos": 1583, "qtde_total_renov": 43993, "qtde_entregue": 40335, "qtde_desbloqueado": 37540}, {"ciclo": "03. 61 A 90 D", "qtde_total": 42364, "qtde_renovados": 26535, "qtde_reemitidos": 956, "qtde_total_renov": 27491, "qtde_entregue": 25245, "qtde_desbloqueado": 23184}, {"ciclo": "04. 91 A 120 D", "qtde_total": 32818, "qtde_renovados": 21230, "qtde_reemitidos": 751, "qtde_total_renov": 21981, "qtde_entregue": 20181, "qtde_desbloqueado": 17981}, {"ciclo": "05. 121 A 180 D", "qtde_total": 54992, "qtde_renovados": 36887, "qtde_reemitidos": 1277, "qtde_total_renov": 38164, "qtde_entregue": 35004, "qtde_desbloqueado": 29024}, {"ciclo": "06. ACIMA DE 180 D", "qtde_total": 309857, "qtde_renovados": 173879, "qtde_reemitidos": 3649, "qtde_total_renov": 177528, "qtde_entregue": 163750, "qtde_desbloqueado": 111997}];

// ── FUNIL DE ATIVAÇÃO PÓS-RENOVAÇÃO ──────────────────────────
const FUNIL_DATA = [
  {safra:'202504', base:15, entregue:13, ativados:13, ativos_tc:4, ativos_td:13, ativos_fisico:13, ativos_ambos:0, tpv_tc:3256.07, tpv_td:103932.48, tpn_tc:0, tpn_td:0, maps_tc:4, maps_td:13},
  {safra:'202505', base:1141, entregue:1019, ativados:924, ativos_tc:492, ativos_td:583, ativos_fisico:789, ativos_ambos:0, tpv_tc:844463.31, tpv_td:1128877.83, tpn_tc:0, tpn_td:0, maps_tc:492, maps_td:583},
  {safra:'202506', base:16963, entregue:15300, ativados:13893, ativos_tc:7909, ativos_td:8693, ativos_fisico:11890, ativos_ambos:0, tpv_tc:15512685.99, tpv_td:16299444.13, tpn_tc:0, tpn_td:0, maps_tc:7909, maps_td:8693},
  {safra:'202507', base:31074, entregue:28040, ativados:24008, ativos_tc:13385, ativos_td:15079, ativos_fisico:20604, ativos_ambos:0, tpv_tc:27855801.31, tpv_td:28119880.91, tpn_tc:0, tpn_td:0, maps_tc:13385, maps_td:15079},
  {safra:'202508', base:39107, entregue:35545, ativados:30706, ativos_tc:16853, ativos_td:19358, ativos_fisico:26186, ativos_ambos:0, tpv_tc:34498753.39, tpv_td:36796776.09, tpn_tc:0, tpn_td:0, maps_tc:16853, maps_td:19358},
  {safra:'202509', base:64759, entregue:60379, ativados:53908, ativos_tc:29536, ativos_td:33982, ativos_fisico:45505, ativos_ambos:0, tpv_tc:60480230.2, tpv_td:62543682.98, tpn_tc:0, tpn_td:0, maps_tc:29536, maps_td:33982},
  {safra:'202510', base:54221, entregue:51193, ativados:44870, ativos_tc:24248, ativos_td:28346, ativos_fisico:37866, ativos_ambos:0, tpv_tc:51557717.93, tpv_td:54943256.25, tpn_tc:0, tpn_td:0, maps_tc:24248, maps_td:28346},
  {safra:'202511', base:80222, entregue:75830, ativados:65682, ativos_tc:36283, ativos_td:41266, ativos_fisico:55676, ativos_ambos:0, tpv_tc:72741286.82, tpv_td:72368156.54, tpn_tc:0, tpn_td:0, maps_tc:36283, maps_td:41266},
  {safra:'202512', base:91084, entregue:85177, ativados:72792, ativos_tc:40893, ativos_td:45230, ativos_fisico:61977, ativos_ambos:0, tpv_tc:83819007.52, tpv_td:78344774.65, tpn_tc:0, tpn_td:0, maps_tc:40893, maps_td:45230},
  {safra:'202601', base:45034, entregue:42262, ativados:35600, ativos_tc:20020, ativos_td:22307, ativos_fisico:30405, ativos_ambos:0, tpv_tc:41455476.24, tpv_td:38454261.66, tpn_tc:0, tpn_td:0, maps_tc:20020, maps_td:22307},
  {safra:'202602', base:23989, entregue:22134, ativados:18686, ativos_tc:11051, ativos_td:10424, ativos_fisico:15579, ativos_ambos:0, tpv_tc:24068736.94, tpv_td:16935042.41, tpn_tc:0, tpn_td:0, maps_tc:11051, maps_td:10424},
  {safra:'202603', base:18424, entregue:17062, ativados:14526, ativos_tc:8109, ativos_td:7558, ativos_fisico:11565, ativos_ambos:0, tpv_tc:16024238.24, tpv_td:10397042.13, tpn_tc:0, tpn_td:0, maps_tc:8109, maps_td:7558},
  {safra:'202604', base:27054, entregue:25517, ativados:20916, ativos_tc:11420, ativos_td:10478, ativos_fisico:16397, ativos_ambos:0, tpv_tc:20012194.24, tpv_td:12472676.44, tpn_tc:0, tpn_td:0, maps_tc:11420, maps_td:10478},
  {safra:'202605', base:35398, entregue:25678, ativados:21554, ativos_tc:13301, ativos_td:12716, ativos_fisico:20087, ativos_ambos:0, tpv_tc:18786178.87, tpv_td:11152180.84, tpn_tc:0, tpn_td:0, maps_tc:13301, maps_td:12716},
];

// ── SPENDING ANTES DA RENOVAÇÃO ───────────────────────────────
const SPENDING_ANTES = [
  {safra:'202504', tpv_tc_antes:7238.28, tpv_td_antes:139590.89, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202505', tpv_tc_antes:932059.83, tpv_td_antes:1349661.19, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202506', tpv_tc_antes:15524037.46, tpv_td_antes:19603234.49, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202507', tpv_tc_antes:28870274.74, tpv_td_antes:34845084.55, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202508', tpv_tc_antes:36668655.74, tpv_td_antes:45040631.11, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202509', tpv_tc_antes:64489946.95, tpv_td_antes:72926834.9, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202510', tpv_tc_antes:54003910.47, tpv_td_antes:64412124.46, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202511', tpv_tc_antes:78245898.14, tpv_td_antes:86496530.77, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202512', tpv_tc_antes:93893857.16, tpv_td_antes:93053463.77, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202601', tpv_tc_antes:48153739.75, tpv_td_antes:49506549.27, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202602', tpv_tc_antes:27841087.99, tpv_td_antes:23021139.27, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202603', tpv_tc_antes:21517924.48, tpv_td_antes:16563212.06, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202604', tpv_tc_antes:30721249.69, tpv_td_antes:22194826.98, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202605', tpv_tc_antes:49787005.77, tpv_td_antes:36031106.3, tpn_tc_antes:0, tpn_td_antes:0},
];

// ── CICLO DE USO POR SAFRA ─────────────────────────────────────
const CICLO_SAFRA = [
  {safra:'202504', c1:11, c2:1, c3:0, c4:0, c5:0, c6:3, c7:0},
  {safra:'202505', c1:455, c2:72, c3:51, c4:35, c5:78, c6:450, c7:0},
  {safra:'202506', c1:7296, c2:1250, c3:735, c4:635, c5:982, c6:6065, c7:0},
  {safra:'202507', c1:12985, c2:2013, c3:1313, c4:1089, c5:1679, c6:11995, c7:0},
  {safra:'202508', c1:16444, c2:2578, c3:1640, c4:1296, c5:2239, c6:14910, c7:0},
  {safra:'202509', c1:28698, c2:4509, c3:2823, c4:2190, c5:3630, c6:22909, c7:0},
  {safra:'202510', c1:24760, c2:3780, c3:2316, c4:1827, c5:2997, c6:18541, c7:0},
  {safra:'202511', c1:36659, c2:5667, c3:3621, c4:2788, c5:6189, c6:25298, c7:0},
  {safra:'202512', c1:42067, c2:6607, c3:4159, c4:3295, c5:8615, c6:26341, c7:0},
  {safra:'202601', c1:21205, c2:3369, c3:2059, c4:2683, c5:3700, c6:12018, c7:0},
  {safra:'202602', c1:11403, c2:1838, c3:1619, c4:1287, c5:1685, c6:6157, c7:0},
  {safra:'202603', c1:8777, c2:1843, c3:1192, c4:789, c5:1126, c6:4697, c7:0},
  {safra:'202604', c1:13372, c2:2560, c3:1540, c4:1199, c5:1366, c6:7017, c7:0},
  {safra:'202605', c1:18831, c2:3144, c3:2045, c4:1197, c5:1612, c6:8569, c7:0},
  {safra:'202606', c1:16673, c2:2990, c3:1489, c4:1032, c5:1314, c6:7236, c7:0},
  {safra:'202607', c1:11728, c2:1771, c3:889, c4:638, c5:946, c6:5311, c7:0},
  {safra:'202608', c1:0, c2:0, c3:0, c4:0, c5:0, c6:0, c7:0},
  {safra:'202609', c1:1, c2:0, c3:0, c4:0, c5:3, c6:1, c7:0},
  {safra:'202610', c1:25, c2:1, c3:0, c4:1, c5:3, c6:8, c7:0},
  {safra:'202611', c1:2, c2:0, c3:0, c4:0, c5:0, c6:0, c7:0},
  {safra:'202612', c1:0, c2:0, c3:0, c4:0, c5:0, c6:2, c7:0},
];

// ── DISTRIBUIÇÃO DIAS_ENTREGA POR FAIXA/MÊS ──────────────────
const DIAS_ENTREGA_DIST = {};

// ── DISTRIBUIÇÃO DIAS_ENTREGA V2 (dias inteiros do tracking) ──
const DIAS_ENTREGA_V2 = {"202504": {"2": 2, "4": 2, "5": 2, "6": 1, "7": 5, "8": 2}, "202505": {"2": 14, "3": 83, "4": 84, "5": 186, "6": 169, "7": 137, "8": 91, "9": 55, "10": 33, "11": 32, "12": 19, "13": 15, "14": 17, "15": 16, "16": 9, "17": 10, "18": 11, "19": 9, "20": 6, "21": 7, "22": 8, "23": 2, "24": 7, "25": 2, "26": 3, "27": 5, "28": 3, "29": 6, "32": 2, "33": 1, "34": 2, "36": 5, "37": 1, "39": 1, "41": 1, "42": 3, "51": 1, "52": 1, "62": 1, "70": 1, "71": 1}, "202506": {"1": 4, "2": 486, "3": 1542, "4": 2204, "5": 2160, "6": 1663, "7": 1242, "8": 1447, "9": 1050, "10": 796, "11": 526, "12": 382, "13": 216, "14": 192, "15": 259, "16": 210, "17": 208, "18": 140, "19": 154, "20": 92, "21": 99, "22": 117, "23": 71, "24": 82, "25": 80, "26": 66, "27": 38, "28": 36, "29": 52, "30": 39, "31": 47, "32": 26, "33": 35, "34": 12, "35": 11, "36": 24, "37": 13, "38": 20, "39": 6, "40": 12, "41": 8, "42": 7, "43": 10, "44": 6, "45": 7, "46": 12, "47": 4, "48": 5, "50": 4, "51": 5, "52": 3, "53": 3, "54": 2, "55": 2, "56": 1, "57": 3, "58": 2, "59": 2, "60": 1, "61": 2, "62": 1, "63": 2, "64": 4, "68": 2, "70": 1, "71": 1, "81": 1, "82": 1, "166": 1, "169": 1, "174": 1, "189": 1, "292": 1}, "202507": {"1": 6, "2": 876, "3": 2222, "4": 2832, "5": 2126, "6": 2610, "7": 2395, "8": 2661, "9": 1934, "10": 1523, "11": 1332, "12": 1286, "13": 1277, "14": 957, "15": 821, "16": 652, "17": 524, "18": 320, "19": 264, "20": 273, "21": 264, "22": 201, "23": 157, "24": 140, "25": 78, "26": 88, "27": 141, "28": 138, "29": 91, "30": 94, "31": 70, "32": 47, "33": 58, "34": 62, "35": 56, "36": 48, "37": 41, "38": 24, "39": 22, "40": 25, "41": 22, "42": 18, "43": 30, "44": 12, "45": 8, "46": 7, "47": 5, "48": 10, "49": 11, "50": 11, "51": 5, "52": 6, "53": 1, "54": 3, "55": 6, "56": 3, "57": 5, "58": 4, "59": 1, "62": 1, "63": 3, "64": 4, "65": 2, "67": 1, "68": 1, "71": 2, "72": 1, "75": 1, "76": 1, "77": 1, "78": 1, "79": 1, "80": 1, "84": 1, "88": 1, "94": 1, "95": 1, "97": 1, "102": 1, "105": 1, "111": 1, "143": 1, "145": 1, "192": 1, "199": 1, "201": 1, "207": 1, "283": 1}, "202508": {"1": 117, "2": 3833, "3": 4798, "4": 4893, "5": 4510, "6": 3979, "7": 2884, "8": 2181, "9": 1610, "10": 973, "11": 738, "12": 650, "13": 585, "14": 509, "15": 447, "16": 501, "17": 391, "18": 280, "19": 310, "20": 297, "21": 308, "22": 198, "23": 164, "24": 121, "25": 88, "26": 119, "27": 170, "28": 110, "29": 127, "30": 77, "31": 39, "32": 40, "33": 58, "34": 62, "35": 53, "36": 46, "37": 39, "38": 21, "39": 11, "40": 23, "41": 30, "42": 16, "43": 18, "44": 15, "45": 3, "46": 3, "47": 14, "48": 8, "49": 16, "50": 8, "51": 6, "52": 4, "53": 3, "54": 3, "55": 2, "56": 1, "57": 4, "58": 2, "59": 3, "60": 2, "61": 2, "64": 4, "66": 2, "68": 1, "70": 2, "71": 1, "75": 2, "76": 1, "77": 2, "80": 1, "84": 1, "86": 2, "91": 1, "96": 1, "101": 1, "110": 1, "125": 1, "135": 1, "158": 1, "181": 1, "187": 9, "189": 2, "196": 1, "211": 1, "214": 1, "289": 1}, "202509": {"1": 681, "2": 6239, "3": 9203, "4": 9429, "5": 7032, "6": 6271, "7": 4602, "8": 3738, "9": 2869, "10": 1570, "11": 1344, "12": 992, "13": 793, "14": 759, "15": 620, "16": 823, "17": 711, "18": 453, "19": 520, "20": 532, "21": 434, "22": 295, "23": 215, "24": 168, "25": 100, "26": 95, "27": 141, "28": 163, "29": 109, "30": 86, "31": 72, "32": 37, "33": 51, "34": 64, "35": 67, "36": 40, "37": 50, "38": 24, "39": 10, "40": 23, "41": 23, "42": 19, "43": 21, "44": 12, "45": 9, "46": 7, "47": 6, "48": 14, "49": 15, "50": 8, "51": 5, "52": 3, "53": 4, "54": 4, "55": 6, "56": 6, "57": 4, "58": 2, "59": 5, "60": 1, "61": 5, "62": 3, "63": 3, "64": 3, "65": 3, "66": 5, "67": 1, "68": 1, "69": 1, "76": 3, "78": 1, "80": 1, "81": 1, "83": 1, "84": 1, "85": 1, "86": 1, "91": 2, "92": 1, "94": 3, "97": 3, "98": 1, "100": 2, "101": 1, "109": 1, "119": 1, "121": 1, "125": 1, "126": 1, "128": 1, "131": 1, "146": 1, "148": 1, "158": 1, "202": 1, "213": 1, "289": 1}, "202510": {"1": 1646, "2": 8469, "3": 10229, "4": 9025, "5": 7232, "6": 4470, "7": 3073, "8": 1490, "9": 1127, "10": 973, "11": 758, "12": 551, "13": 440, "14": 314, "15": 220, "16": 336, "17": 289, "18": 238, "19": 155, "20": 157, "21": 94, "22": 73, "23": 107, "24": 96, "25": 61, "26": 62, "27": 51, "28": 43, "29": 25, "30": 42, "31": 37, "32": 33, "33": 26, "34": 21, "35": 19, "36": 8, "37": 14, "38": 16, "39": 11, "40": 19, "41": 7, "42": 5, "43": 7, "44": 3, "45": 7, "46": 4, "47": 4, "49": 1, "51": 2, "52": 2, "53": 1, "54": 2, "55": 4, "57": 1, "59": 1, "60": 1, "63": 2, "65": 2, "67": 1, "69": 1, "71": 1, "76": 1, "80": 1, "89": 2, "92": 1, "100": 1, "109": 1, "114": 1, "131": 1, "149": 1, "198": 1}, "202511": {"1": 2706, "2": 15796, "3": 15928, "4": 11495, "5": 9472, "6": 8371, "7": 5078, "8": 2274, "9": 1234, "10": 702, "11": 284, "12": 340, "13": 542, "14": 482, "15": 371, "16": 327, "17": 216, "18": 86, "19": 120, "20": 220, "21": 215, "22": 164, "23": 106, "24": 63, "25": 42, "26": 58, "27": 66, "28": 58, "29": 53, "30": 51, "31": 36, "32": 14, "33": 26, "34": 31, "35": 29, "36": 19, "37": 14, "38": 9, "39": 9, "40": 14, "41": 20, "42": 11, "43": 9, "44": 5, "45": 6, "46": 5, "47": 5, "48": 2, "49": 8, "50": 6, "51": 5, "52": 3, "53": 2, "54": 5, "55": 2, "57": 6, "58": 4, "59": 2, "60": 4, "61": 2, "62": 3, "63": 5, "64": 3, "66": 3, "67": 1, "69": 4, "70": 1, "71": 1, "72": 1, "73": 2, "74": 1, "76": 2, "77": 1, "78": 1, "79": 1, "80": 1, "81": 1, "82": 1, "84": 3, "85": 1, "86": 2, "87": 2, "88": 3, "91": 1, "92": 1, "95": 1, "98": 1, "102": 1, "105": 1, "117": 1, "122": 2, "126": 2, "128": 1, "130": 1, "142": 1, "163": 1, "225": 1}, "202512": {"1": 3091, "2": 14507, "3": 16114, "4": 14887, "5": 13155, "6": 10023, "7": 6509, "8": 2893, "9": 1275, "10": 832, "11": 756, "12": 644, "13": 528, "14": 393, "15": 281, "16": 148, "17": 112, "18": 191, "19": 167, "20": 150, "21": 142, "22": 119, "23": 68, "24": 63, "25": 108, "26": 86, "27": 91, "28": 79, "29": 60, "30": 41, "31": 38, "32": 53, "33": 38, "34": 40, "35": 46, "36": 24, "37": 23, "38": 27, "39": 29, "40": 27, "41": 21, "42": 17, "43": 15, "44": 10, "45": 14, "46": 9, "47": 10, "48": 7, "49": 6, "50": 9, "51": 5, "52": 6, "53": 12, "54": 6, "55": 2, "56": 6, "57": 6, "58": 3, "59": 5, "60": 1, "61": 3, "62": 2, "63": 2, "64": 4, "65": 5, "66": 2, "68": 3, "69": 2, "70": 1, "72": 2, "73": 2, "74": 4, "75": 3, "76": 2, "78": 2, "79": 3, "80": 8, "83": 2, "84": 1, "85": 1, "86": 2, "89": 1, "90": 1, "91": 1, "92": 1, "93": 1, "94": 2, "95": 1, "96": 2, "103": 2, "107": 1, "109": 1, "110": 2, "112": 1, "119": 2, "121": 2, "127": 1, "129": 2, "130": 1, "197": 3}, "202601": {"1": 1736, "2": 6463, "3": 9852, "4": 7743, "5": 6404, "6": 5117, "7": 3194, "8": 1297, "9": 517, "10": 262, "11": 192, "12": 149, "13": 91, "14": 55, "15": 40, "16": 37, "17": 36, "18": 42, "19": 26, "20": 31, "21": 41, "22": 23, "23": 24, "24": 33, "25": 27, "26": 22, "27": 25, "28": 19, "29": 19, "30": 15, "31": 11, "32": 9, "33": 16, "34": 14, "35": 11, "36": 5, "37": 17, "38": 17, "39": 8, "40": 6, "41": 4, "42": 8, "43": 6, "44": 8, "45": 8, "46": 3, "47": 3, "48": 9, "49": 4, "50": 3, "51": 4, "52": 2, "53": 3, "54": 1, "56": 1, "57": 1, "58": 1, "60": 1, "61": 1, "62": 1, "63": 2, "65": 4, "67": 2, "68": 2, "69": 1, "70": 1, "72": 3, "73": 2, "74": 2, "75": 2, "76": 1, "79": 3, "80": 10, "82": 1, "85": 1, "89": 1, "92": 1, "93": 2, "95": 1, "96": 2, "97": 1, "101": 1, "104": 1, "106": 1, "144": 1}, "202602": {"1": 860, "2": 3996, "3": 5059, "4": 3295, "5": 3838, "6": 2824, "7": 1526, "8": 712, "9": 404, "10": 127, "11": 88, "12": 66, "13": 50, "14": 23, "15": 24, "16": 18, "17": 27, "18": 37, "19": 12, "20": 11, "21": 20, "22": 22, "23": 13, "24": 13, "25": 15, "26": 8, "27": 5, "28": 20, "29": 12, "30": 9, "31": 9, "32": 7, "33": 2, "34": 5, "35": 5, "36": 4, "37": 8, "38": 10, "39": 6, "40": 5, "42": 7, "43": 1, "44": 6, "45": 1, "46": 2, "47": 2, "48": 1, "49": 1, "51": 3, "52": 2, "56": 1, "57": 2, "58": 1, "60": 4, "61": 3, "63": 2, "64": 1, "67": 1, "68": 2, "70": 1, "71": 1, "73": 2, "74": 1, "80": 4, "81": 1, "86": 1, "94": 1, "106": 1, "108": 1, "124": 1, "149": 1, "155": 1}, "202603": {"1": 680, "2": 2695, "3": 3077, "4": 2792, "5": 3157, "6": 2473, "7": 1188, "8": 768, "9": 524, "10": 158, "11": 80, "12": 43, "13": 19, "14": 17, "15": 18, "16": 14, "17": 11, "18": 17, "19": 17, "20": 13, "21": 8, "22": 17, "23": 11, "24": 9, "25": 7, "26": 7, "27": 11, "28": 9, "29": 6, "30": 5, "31": 7, "32": 6, "33": 5, "34": 4, "35": 5, "36": 2, "37": 8, "38": 3, "39": 6, "40": 2, "41": 3, "42": 1, "43": 1, "44": 2, "45": 1, "49": 2, "50": 3, "51": 1, "52": 1, "53": 1, "54": 1, "57": 1, "60": 1, "63": 1, "64": 1, "66": 1, "68": 1, "74": 1, "75": 2, "77": 1, "82": 1}, "202604": {"1": 1451, "2": 6310, "3": 6170, "4": 3741, "5": 3512, "6": 2691, "7": 1100, "8": 466, "9": 211, "10": 130, "11": 94, "12": 44, "13": 25, "14": 18, "15": 22, "16": 15, "17": 21, "18": 27, "19": 15, "20": 6, "21": 14, "22": 11, "23": 11, "24": 5, "25": 11, "26": 11, "27": 6, "28": 8, "29": 8, "30": 8, "31": 8, "32": 7, "33": 3, "34": 1, "35": 1, "36": 5, "37": 5, "38": 4, "40": 2, "43": 3, "44": 1, "45": 1, "52": 1, "53": 1, "58": 1, "60": 2, "61": 1, "66": 1, "70": 1, "74": 1, "92": 2}, "202605": {"1": 1291, "2": 7739, "3": 7414, "4": 4259, "5": 4648, "6": 3166, "7": 1121, "8": 562, "9": 214, "10": 116, "11": 58, "12": 54, "13": 21, "14": 20, "15": 18, "16": 30, "17": 13, "18": 9, "19": 12, "20": 5, "21": 21, "22": 20, "23": 15, "24": 7, "25": 12, "26": 12, "27": 8, "28": 9, "29": 8, "30": 5, "31": 5, "32": 6, "33": 8, "34": 3, "35": 9, "36": 6, "37": 4, "38": 2, "39": 6, "40": 3, "42": 1, "46": 3, "50": 1, "52": 2, "54": 1}, "202606": {"1": 1234, "2": 5793, "3": 5873, "4": 4311, "5": 5728, "6": 3162, "7": 1307, "8": 832, "9": 259, "10": 198, "11": 76, "12": 99, "13": 34, "14": 32, "15": 18, "16": 17, "17": 5, "18": 4, "19": 8, "20": 5, "21": 21, "22": 13, "23": 21, "24": 4, "25": 6, "26": 21, "27": 13, "28": 12, "29": 13, "30": 1, "31": 2, "32": 3, "33": 11, "34": 5, "35": 6, "36": 10, "37": 12, "39": 1, "40": 6}, "202607": {"1": 536, "2": 6543, "3": 5445, "4": 2241, "5": 2567, "6": 1586, "7": 544, "8": 107, "9": 68}, "202609": {"3": 3, "4": 1, "14": 1}, "202610": {"1": 3, "2": 3, "3": 4, "4": 10, "5": 6, "7": 4, "8": 1, "9": 1, "10": 1, "11": 2, "15": 1, "21": 1, "283": 1}, "202611": {"7": 2}, "202612": {"5": 1, "16": 1}};

// ── ENTREGA POR CICLO DE USO ───────────────────────────────────
const ENTREGA_CICLO = {
  "202504": {
    "01. 1 A 30 D": {
      "total": 13,
      "entregue": 9,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 1,
        "01. ATE 2 DIAS": 1,
        "02. ATE 5 DIAS": 2,
        "03. ATE 7 DIAS": 4,
        "04. ATE 10 DIAS": 2
      }
    },
    "02. 31 A 60 D": {
      "total": 1,
      "entregue": 1,
      "faixas": {
        "02. ATE 5 DIAS": 1
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 5,
      "entregue": 3,
      "faixas": {
        "01. ATE 2 DIAS": 1,
        "02. ATE 5 DIAS": 1,
        "03. ATE 7 DIAS": 1
      }
    }
  },
  "202505": {
    "01. 1 A 30 D": {
      "total": 478,
      "entregue": 423,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 10,
        "01. ATE 2 DIAS": 4,
        "02. ATE 5 DIAS": 158,
        "03. ATE 7 DIAS": 118,
        "04. ATE 10 DIAS": 61,
        "05. ACIMA DE 10 DIAS": 82
      }
    },
    "02. 31 A 60 D": {
      "total": 80,
      "entregue": 68,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 3,
        "02. ATE 5 DIAS": 16,
        "03. ATE 7 DIAS": 27,
        "04. ATE 10 DIAS": 12,
        "05. ACIMA DE 10 DIAS": 13
      }
    },
    "03. 61 A 90 D": {
      "total": 51,
      "entregue": 45,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 2,
        "02. ATE 5 DIAS": 13,
        "03. ATE 7 DIAS": 9,
        "04. ATE 10 DIAS": 11,
        "05. ACIMA DE 10 DIAS": 12
      }
    },
    "04. 91 A 120 D": {
      "total": 35,
      "entregue": 25,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 4,
        "02. ATE 5 DIAS": 10,
        "03. ATE 7 DIAS": 9,
        "04. ATE 10 DIAS": 2,
        "05. ACIMA DE 10 DIAS": 4
      }
    },
    "05. 121 A 180 D": {
      "total": 83,
      "entregue": 67,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 9,
        "01. ATE 2 DIAS": 2,
        "02. ATE 5 DIAS": 17,
        "03. ATE 7 DIAS": 19,
        "04. ATE 10 DIAS": 14,
        "05. ACIMA DE 10 DIAS": 15
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 627,
      "entregue": 391,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 28,
        "01. ATE 2 DIAS": 6,
        "02. ATE 5 DIAS": 120,
        "03. ATE 7 DIAS": 115,
        "04. ATE 10 DIAS": 76,
        "05. ACIMA DE 10 DIAS": 74
      }
    }
  },
  "202506": {
    "01. 1 A 30 D": {
      "total": 7533,
      "entregue": 6580,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 216,
        "01. ATE 2 DIAS": 215,
        "02. ATE 5 DIAS": 2508,
        "03. ATE 7 DIAS": 1215,
        "04. ATE 10 DIAS": 1378,
        "05. ACIMA DE 10 DIAS": 1264
      }
    },
    "02. 31 A 60 D": {
      "total": 1292,
      "entregue": 1138,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 47,
        "01. ATE 2 DIAS": 28,
        "02. ATE 5 DIAS": 388,
        "03. ATE 7 DIAS": 219,
        "04. ATE 10 DIAS": 232,
        "05. ACIMA DE 10 DIAS": 271
      }
    },
    "03. 61 A 90 D": {
      "total": 765,
      "entregue": 682,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 19,
        "01. ATE 2 DIAS": 18,
        "02. ATE 5 DIAS": 242,
        "03. ATE 7 DIAS": 118,
        "04. ATE 10 DIAS": 159,
        "05. ACIMA DE 10 DIAS": 145
      }
    },
    "04. 91 A 120 D": {
      "total": 676,
      "entregue": 587,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 21,
        "01. ATE 2 DIAS": 28,
        "02. ATE 5 DIAS": 205,
        "03. ATE 7 DIAS": 93,
        "04. ATE 10 DIAS": 132,
        "05. ACIMA DE 10 DIAS": 129
      }
    },
    "05. 121 A 180 D": {
      "total": 1017,
      "entregue": 883,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 40,
        "01. ATE 2 DIAS": 25,
        "02. ATE 5 DIAS": 331,
        "03. ATE 7 DIAS": 164,
        "04. ATE 10 DIAS": 179,
        "05. ACIMA DE 10 DIAS": 184
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 8856,
      "entregue": 5430,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 326,
        "01. ATE 2 DIAS": 164,
        "02. ATE 5 DIAS": 2062,
        "03. ATE 7 DIAS": 987,
        "04. ATE 10 DIAS": 1089,
        "05. ACIMA DE 10 DIAS": 1128
      }
    }
  },
  "202507": {
    "01. 1 A 30 D": {
      "total": 13199,
      "entregue": 11572,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 516,
        "01. ATE 2 DIAS": 295,
        "02. ATE 5 DIAS": 2835,
        "03. ATE 7 DIAS": 2042,
        "04. ATE 10 DIAS": 2438,
        "05. ACIMA DE 10 DIAS": 3961
      }
    },
    "02. 31 A 60 D": {
      "total": 2077,
      "entregue": 1839,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 72,
        "01. ATE 2 DIAS": 38,
        "02. ATE 5 DIAS": 382,
        "03. ATE 7 DIAS": 352,
        "04. ATE 10 DIAS": 398,
        "05. ACIMA DE 10 DIAS": 669
      }
    },
    "03. 61 A 90 D": {
      "total": 1367,
      "entregue": 1196,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 57,
        "01. ATE 2 DIAS": 27,
        "02. ATE 5 DIAS": 265,
        "03. ATE 7 DIAS": 196,
        "04. ATE 10 DIAS": 262,
        "05. ACIMA DE 10 DIAS": 446
      }
    },
    "04. 91 A 120 D": {
      "total": 1125,
      "entregue": 982,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 51,
        "01. ATE 2 DIAS": 19,
        "02. ATE 5 DIAS": 220,
        "03. ATE 7 DIAS": 162,
        "04. ATE 10 DIAS": 224,
        "05. ACIMA DE 10 DIAS": 357
      }
    },
    "05. 121 A 180 D": {
      "total": 1735,
      "entregue": 1525,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 77,
        "01. ATE 2 DIAS": 37,
        "02. ATE 5 DIAS": 384,
        "03. ATE 7 DIAS": 253,
        "04. ATE 10 DIAS": 320,
        "05. ACIMA DE 10 DIAS": 531
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 18216,
      "entregue": 10926,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 689,
        "01. ATE 2 DIAS": 342,
        "02. ATE 5 DIAS": 2723,
        "03. ATE 7 DIAS": 1847,
        "04. ATE 10 DIAS": 2375,
        "05. ACIMA DE 10 DIAS": 3639
      }
    }
  },
  "202508": {
    "01. 1 A 30 D": {
      "total": 16869,
      "entregue": 14773,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 583,
        "01. ATE 2 DIAS": 1516,
        "02. ATE 5 DIAS": 5849,
        "03. ATE 7 DIAS": 2825,
        "04. ATE 10 DIAS": 1979,
        "05. ACIMA DE 10 DIAS": 2604
      }
    },
    "02. 31 A 60 D": {
      "total": 2686,
      "entregue": 2347,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 106,
        "01. ATE 2 DIAS": 253,
        "02. ATE 5 DIAS": 834,
        "03. ATE 7 DIAS": 445,
        "04. ATE 10 DIAS": 322,
        "05. ACIMA DE 10 DIAS": 493
      }
    },
    "03. 61 A 90 D": {
      "total": 1757,
      "entregue": 1497,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 56,
        "01. ATE 2 DIAS": 158,
        "02. ATE 5 DIAS": 559,
        "03. ATE 7 DIAS": 293,
        "04. ATE 10 DIAS": 190,
        "05. ACIMA DE 10 DIAS": 297
      }
    },
    "04. 91 A 120 D": {
      "total": 1361,
      "entregue": 1182,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 56,
        "01. ATE 2 DIAS": 102,
        "02. ATE 5 DIAS": 432,
        "03. ATE 7 DIAS": 242,
        "04. ATE 10 DIAS": 158,
        "05. ACIMA DE 10 DIAS": 248
      }
    },
    "05. 121 A 180 D": {
      "total": 2310,
      "entregue": 2076,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 78,
        "01. ATE 2 DIAS": 227,
        "02. ATE 5 DIAS": 774,
        "03. ATE 7 DIAS": 381,
        "04. ATE 10 DIAS": 269,
        "05. ACIMA DE 10 DIAS": 425
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 22979,
      "entregue": 13670,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 836,
        "01. ATE 2 DIAS": 1512,
        "02. ATE 5 DIAS": 5300,
        "03. ATE 7 DIAS": 2502,
        "04. ATE 10 DIAS": 1763,
        "05. ACIMA DE 10 DIAS": 2593
      }
    }
  },
  "202509": {
    "01. 1 A 30 D": {
      "total": 29347,
      "entregue": 26631,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 667,
        "01. ATE 2 DIAS": 2833,
        "02. ATE 5 DIAS": 11120,
        "03. ATE 7 DIAS": 4763,
        "04. ATE 10 DIAS": 3722,
        "05. ACIMA DE 10 DIAS": 4190
      }
    },
    "02. 31 A 60 D": {
      "total": 4656,
      "entregue": 4226,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 113,
        "01. ATE 2 DIAS": 409,
        "02. ATE 5 DIAS": 1717,
        "03. ATE 7 DIAS": 756,
        "04. ATE 10 DIAS": 559,
        "05. ACIMA DE 10 DIAS": 785
      }
    },
    "03. 61 A 90 D": {
      "total": 2934,
      "entregue": 2656,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 66,
        "01. ATE 2 DIAS": 279,
        "02. ATE 5 DIAS": 1060,
        "03. ATE 7 DIAS": 488,
        "04. ATE 10 DIAS": 333,
        "05. ACIMA DE 10 DIAS": 495
      }
    },
    "04. 91 A 120 D": {
      "total": 2278,
      "entregue": 2078,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 41,
        "01. ATE 2 DIAS": 193,
        "02. ATE 5 DIAS": 827,
        "03. ATE 7 DIAS": 401,
        "04. ATE 10 DIAS": 305,
        "05. ACIMA DE 10 DIAS": 352
      }
    },
    "05. 121 A 180 D": {
      "total": 3740,
      "entregue": 3430,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 76,
        "01. ATE 2 DIAS": 389,
        "02. ATE 5 DIAS": 1378,
        "03. ATE 7 DIAS": 613,
        "04. ATE 10 DIAS": 486,
        "05. ACIMA DE 10 DIAS": 564
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 33592,
      "entregue": 21358,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 1001,
        "01. ATE 2 DIAS": 2510,
        "02. ATE 5 DIAS": 8943,
        "03. ATE 7 DIAS": 3634,
        "04. ATE 10 DIAS": 2700,
        "05. ACIMA DE 10 DIAS": 3570
      }
    }
  },
  "202510": {
    "01. 1 A 30 D": {
      "total": 25661,
      "entregue": 23147,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 403,
        "01. ATE 2 DIAS": 4542,
        "02. ATE 5 DIAS": 11873,
        "03. ATE 7 DIAS": 3245,
        "04. ATE 10 DIAS": 1596,
        "05. ACIMA DE 10 DIAS": 1890
      }
    },
    "02. 31 A 60 D": {
      "total": 3992,
      "entregue": 3629,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 52,
        "01. ATE 2 DIAS": 634,
        "02. ATE 5 DIAS": 1820,
        "03. ATE 7 DIAS": 571,
        "04. ATE 10 DIAS": 275,
        "05. ACIMA DE 10 DIAS": 328
      }
    },
    "03. 61 A 90 D": {
      "total": 2441,
      "entregue": 2206,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 39,
        "01. ATE 2 DIAS": 369,
        "02. ATE 5 DIAS": 1145,
        "03. ATE 7 DIAS": 311,
        "04. ATE 10 DIAS": 163,
        "05. ACIMA DE 10 DIAS": 218
      }
    },
    "04. 91 A 120 D": {
      "total": 1901,
      "entregue": 1753,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 28,
        "01. ATE 2 DIAS": 289,
        "02. ATE 5 DIAS": 870,
        "03. ATE 7 DIAS": 272,
        "04. ATE 10 DIAS": 131,
        "05. ACIMA DE 10 DIAS": 191
      }
    },
    "05. 121 A 180 D": {
      "total": 3074,
      "entregue": 2857,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 34,
        "01. ATE 2 DIAS": 532,
        "02. ATE 5 DIAS": 1396,
        "03. ATE 7 DIAS": 431,
        "04. ATE 10 DIAS": 221,
        "05. ACIMA DE 10 DIAS": 277
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 28748,
      "entregue": 17601,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 607,
        "01. ATE 2 DIAS": 3502,
        "02. ATE 5 DIAS": 8929,
        "03. ATE 7 DIAS": 2539,
        "04. ATE 10 DIAS": 1171,
        "05. ACIMA DE 10 DIAS": 1459
      }
    }
  },
  "202511": {
    "01. 1 A 30 D": {
      "total": 38065,
      "entregue": 34266,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 524,
        "01. ATE 2 DIAS": 8373,
        "02. ATE 5 DIAS": 16213,
        "03. ATE 7 DIAS": 6008,
        "04. ATE 10 DIAS": 1892,
        "05. ACIMA DE 10 DIAS": 1775
      }
    },
    "02. 31 A 60 D": {
      "total": 5978,
      "entregue": 5406,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 85,
        "01. ATE 2 DIAS": 1266,
        "02. ATE 5 DIAS": 2557,
        "03. ATE 7 DIAS": 949,
        "04. ATE 10 DIAS": 308,
        "05. ACIMA DE 10 DIAS": 326
      }
    },
    "03. 61 A 90 D": {
      "total": 3791,
      "entregue": 3468,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 42,
        "01. ATE 2 DIAS": 786,
        "02. ATE 5 DIAS": 1642,
        "03. ATE 7 DIAS": 634,
        "04. ATE 10 DIAS": 194,
        "05. ACIMA DE 10 DIAS": 212
      }
    },
    "04. 91 A 120 D": {
      "total": 2896,
      "entregue": 2647,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 36,
        "01. ATE 2 DIAS": 577,
        "02. ATE 5 DIAS": 1250,
        "03. ATE 7 DIAS": 494,
        "04. ATE 10 DIAS": 158,
        "05. ACIMA DE 10 DIAS": 168
      }
    },
    "05. 121 A 180 D": {
      "total": 7452,
      "entregue": 5772,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 195,
        "01. ATE 2 DIAS": 1325,
        "02. ATE 5 DIAS": 2736,
        "03. ATE 7 DIAS": 1031,
        "04. ATE 10 DIAS": 331,
        "05. ACIMA DE 10 DIAS": 349
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 40140,
      "entregue": 24271,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 653,
        "01. ATE 2 DIAS": 5892,
        "02. ATE 5 DIAS": 11797,
        "03. ATE 7 DIAS": 4035,
        "04. ATE 10 DIAS": 1203,
        "05. ACIMA DE 10 DIAS": 1344
      }
    }
  },
  "202512": {
    "01. 1 A 30 D": {
      "total": 43159,
      "entregue": 38764,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 531,
        "01. ATE 2 DIAS": 8019,
        "02. ATE 5 DIAS": 19535,
        "03. ATE 7 DIAS": 7205,
        "04. ATE 10 DIAS": 2027,
        "05. ACIMA DE 10 DIAS": 1974
      }
    },
    "02. 31 A 60 D": {
      "total": 6843,
      "entregue": 6238,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 76,
        "01. ATE 2 DIAS": 1237,
        "02. ATE 5 DIAS": 3057,
        "03. ATE 7 DIAS": 1226,
        "04. ATE 10 DIAS": 338,
        "05. ACIMA DE 10 DIAS": 379
      }
    },
    "03. 61 A 90 D": {
      "total": 4267,
      "entregue": 3938,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 34,
        "01. ATE 2 DIAS": 768,
        "02. ATE 5 DIAS": 1965,
        "03. ATE 7 DIAS": 768,
        "04. ATE 10 DIAS": 219,
        "05. ACIMA DE 10 DIAS": 217
      }
    },
    "04. 91 A 120 D": {
      "total": 3325,
      "entregue": 3117,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 25,
        "01. ATE 2 DIAS": 648,
        "02. ATE 5 DIAS": 1526,
        "03. ATE 7 DIAS": 579,
        "04. ATE 10 DIAS": 183,
        "05. ACIMA DE 10 DIAS": 180
      }
    },
    "05. 121 A 180 D": {
      "total": 11143,
      "entregue": 7926,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 336,
        "01. ATE 2 DIAS": 1409,
        "02. ATE 5 DIAS": 4056,
        "03. ATE 7 DIAS": 1543,
        "04. ATE 10 DIAS": 475,
        "05. ACIMA DE 10 DIAS": 442
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 42539,
      "entregue": 25194,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 621,
        "01. ATE 2 DIAS": 4968,
        "02. ATE 5 DIAS": 12553,
        "03. ATE 7 DIAS": 4612,
        "04. ATE 10 DIAS": 1551,
        "05. ACIMA DE 10 DIAS": 1509
      }
    }
  },
  "202601": {
    "01. 1 A 30 D": {
      "total": 21492,
      "entregue": 19659,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 194,
        "01. ATE 2 DIAS": 3600,
        "02. ATE 5 DIAS": 10858,
        "03. ATE 7 DIAS": 3796,
        "04. ATE 10 DIAS": 922,
        "05. ACIMA DE 10 DIAS": 481
      }
    },
    "02. 31 A 60 D": {
      "total": 3424,
      "entregue": 3157,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 33,
        "01. ATE 2 DIAS": 521,
        "02. ATE 5 DIAS": 1733,
        "03. ATE 7 DIAS": 660,
        "04. ATE 10 DIAS": 163,
        "05. ACIMA DE 10 DIAS": 80
      }
    },
    "03. 61 A 90 D": {
      "total": 2057,
      "entregue": 1941,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 13,
        "01. ATE 2 DIAS": 325,
        "02. ATE 5 DIAS": 1069,
        "03. ATE 7 DIAS": 380,
        "04. ATE 10 DIAS": 110,
        "05. ACIMA DE 10 DIAS": 57
      }
    },
    "04. 91 A 120 D": {
      "total": 3255,
      "entregue": 2468,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 83,
        "01. ATE 2 DIAS": 508,
        "02. ATE 5 DIAS": 1286,
        "03. ATE 7 DIAS": 473,
        "04. ATE 10 DIAS": 130,
        "05. ACIMA DE 10 DIAS": 71
      }
    },
    "05. 121 A 180 D": {
      "total": 4669,
      "entregue": 3500,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 91,
        "01. ATE 2 DIAS": 697,
        "02. ATE 5 DIAS": 1835,
        "03. ATE 7 DIAS": 685,
        "04. ATE 10 DIAS": 170,
        "05. ACIMA DE 10 DIAS": 113
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 19384,
      "entregue": 11537,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 204,
        "01. ATE 2 DIAS": 2246,
        "02. ATE 5 DIAS": 6432,
        "03. ATE 7 DIAS": 2027,
        "04. ATE 10 DIAS": 507,
        "05. ACIMA DE 10 DIAS": 325
      }
    }
  },
  "202602": {
    "01. 1 A 30 D": {
      "total": 11426,
      "entregue": 10298,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 99,
        "01. ATE 2 DIAS": 2169,
        "02. ATE 5 DIAS": 5373,
        "03. ATE 7 DIAS": 1947,
        "04. ATE 10 DIAS": 549,
        "05. ACIMA DE 10 DIAS": 259
      }
    },
    "02. 31 A 60 D": {
      "total": 1828,
      "entregue": 1701,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 17,
        "01. ATE 2 DIAS": 329,
        "02. ATE 5 DIAS": 875,
        "03. ATE 7 DIAS": 330,
        "04. ATE 10 DIAS": 114,
        "05. ACIMA DE 10 DIAS": 53
      }
    },
    "03. 61 A 90 D": {
      "total": 2007,
      "entregue": 1463,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 56,
        "01. ATE 2 DIAS": 293,
        "02. ATE 5 DIAS": 777,
        "03. ATE 7 DIAS": 266,
        "04. ATE 10 DIAS": 86,
        "05. ACIMA DE 10 DIAS": 40
      }
    },
    "04. 91 A 120 D": {
      "total": 1659,
      "entregue": 1194,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 36,
        "01. ATE 2 DIAS": 222,
        "02. ATE 5 DIAS": 650,
        "03. ATE 7 DIAS": 225,
        "04. ATE 10 DIAS": 66,
        "05. ACIMA DE 10 DIAS": 31
      }
    },
    "05. 121 A 180 D": {
      "total": 2320,
      "entregue": 1603,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 26,
        "01. ATE 2 DIAS": 339,
        "02. ATE 5 DIAS": 782,
        "03. ATE 7 DIAS": 345,
        "04. ATE 10 DIAS": 89,
        "05. ACIMA DE 10 DIAS": 47
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 10309,
      "entregue": 5875,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 111,
        "01. ATE 2 DIAS": 1212,
        "02. ATE 5 DIAS": 3164,
        "03. ATE 7 DIAS": 1057,
        "04. ATE 10 DIAS": 295,
        "05. ACIMA DE 10 DIAS": 147
      }
    }
  },
  "202603": {
    "01. 1 A 30 D": {
      "total": 8712,
      "entregue": 7981,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 55,
        "01. ATE 2 DIAS": 1407,
        "02. ATE 5 DIAS": 4048,
        "03. ATE 7 DIAS": 1670,
        "04. ATE 10 DIAS": 676,
        "05. ACIMA DE 10 DIAS": 180
      }
    },
    "02. 31 A 60 D": {
      "total": 2253,
      "entregue": 1669,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 43,
        "01. ATE 2 DIAS": 323,
        "02. ATE 5 DIAS": 824,
        "03. ATE 7 DIAS": 356,
        "04. ATE 10 DIAS": 127,
        "05. ACIMA DE 10 DIAS": 38
      }
    },
    "03. 61 A 90 D": {
      "total": 1478,
      "entregue": 1106,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 29,
        "01. ATE 2 DIAS": 211,
        "02. ATE 5 DIAS": 530,
        "03. ATE 7 DIAS": 246,
        "04. ATE 10 DIAS": 92,
        "05. ACIMA DE 10 DIAS": 27
      }
    },
    "04. 91 A 120 D": {
      "total": 1042,
      "entregue": 760,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 14,
        "01. ATE 2 DIAS": 125,
        "02. ATE 5 DIAS": 372,
        "03. ATE 7 DIAS": 164,
        "04. ATE 10 DIAS": 85,
        "05. ACIMA DE 10 DIAS": 14
      }
    },
    "05. 121 A 180 D": {
      "total": 1690,
      "entregue": 1065,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 22,
        "01. ATE 2 DIAS": 175,
        "02. ATE 5 DIAS": 517,
        "03. ATE 7 DIAS": 253,
        "04. ATE 10 DIAS": 95,
        "05. ACIMA DE 10 DIAS": 25
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 7702,
      "entregue": 4481,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 81,
        "01. ATE 2 DIAS": 887,
        "02. ATE 5 DIAS": 2313,
        "03. ATE 7 DIAS": 846,
        "04. ATE 10 DIAS": 328,
        "05. ACIMA DE 10 DIAS": 107
      }
    }
  },
  "202604": {
    "01. 1 A 30 D": {
      "total": 14064,
      "entregue": 12491,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 167,
        "01. ATE 2 DIAS": 3707,
        "02. ATE 5 DIAS": 6338,
        "03. ATE 7 DIAS": 1835,
        "04. ATE 10 DIAS": 411,
        "05. ACIMA DE 10 DIAS": 200
      }
    },
    "02. 31 A 60 D": {
      "total": 3002,
      "entregue": 2383,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 58,
        "01. ATE 2 DIAS": 713,
        "02. ATE 5 DIAS": 1215,
        "03. ATE 7 DIAS": 345,
        "04. ATE 10 DIAS": 65,
        "05. ACIMA DE 10 DIAS": 45
      }
    },
    "03. 61 A 90 D": {
      "total": 1889,
      "entregue": 1461,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 43,
        "01. ATE 2 DIAS": 398,
        "02. ATE 5 DIAS": 763,
        "03. ATE 7 DIAS": 226,
        "04. ATE 10 DIAS": 53,
        "05. ACIMA DE 10 DIAS": 21
      }
    },
    "04. 91 A 120 D": {
      "total": 1647,
      "entregue": 1154,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 21,
        "01. ATE 2 DIAS": 311,
        "02. ATE 5 DIAS": 635,
        "03. ATE 7 DIAS": 175,
        "04. ATE 10 DIAS": 22,
        "05. ACIMA DE 10 DIAS": 11
      }
    },
    "05. 121 A 180 D": {
      "total": 2053,
      "entregue": 1285,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 38,
        "01. ATE 2 DIAS": 367,
        "02. ATE 5 DIAS": 657,
        "03. ATE 7 DIAS": 192,
        "04. ATE 10 DIAS": 44,
        "05. ACIMA DE 10 DIAS": 25
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 11500,
      "entregue": 6743,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 118,
        "01. ATE 2 DIAS": 2140,
        "02. ATE 5 DIAS": 3399,
        "03. ATE 7 DIAS": 887,
        "04. ATE 10 DIAS": 188,
        "05. ACIMA DE 10 DIAS": 129
      }
    }
  },
  "202605": {
    "01. 1 A 30 D": {
      "total": 24527,
      "entregue": 13800,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 2124,
        "01. ATE 2 DIAS": 4894,
        "02. ATE 5 DIAS": 8721,
        "03. ATE 7 DIAS": 2361,
        "04. ATE 10 DIAS": 510,
        "05. ACIMA DE 10 DIAS": 221
      }
    },
    "02. 31 A 60 D": {
      "total": 4408,
      "entregue": 2454,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 353,
        "01. ATE 2 DIAS": 772,
        "02. ATE 5 DIAS": 1472,
        "03. ATE 7 DIAS": 410,
        "04. ATE 10 DIAS": 88,
        "05. ACIMA DE 10 DIAS": 49
      }
    },
    "03. 61 A 90 D": {
      "total": 3151,
      "entregue": 1597,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 212,
        "01. ATE 2 DIAS": 530,
        "02. ATE 5 DIAS": 993,
        "03. ATE 7 DIAS": 247,
        "04. ATE 10 DIAS": 42,
        "05. ACIMA DE 10 DIAS": 21
      }
    },
    "04. 91 A 120 D": {
      "total": 2181,
      "entregue": 857,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 164,
        "01. ATE 2 DIAS": 289,
        "02. ATE 5 DIAS": 561,
        "03. ATE 7 DIAS": 142,
        "04. ATE 10 DIAS": 24,
        "05. ACIMA DE 10 DIAS": 17
      }
    },
    "05. 121 A 180 D": {
      "total": 3257,
      "entregue": 1143,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 238,
        "01. ATE 2 DIAS": 397,
        "02. ATE 5 DIAS": 718,
        "03. ATE 7 DIAS": 209,
        "04. ATE 10 DIAS": 30,
        "05. ACIMA DE 10 DIAS": 20
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 17692,
      "entregue": 5827,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 1360,
        "01. ATE 2 DIAS": 2148,
        "02. ATE 5 DIAS": 3856,
        "03. ATE 7 DIAS": 918,
        "04. ATE 10 DIAS": 198,
        "05. ACIMA DE 10 DIAS": 89
      }
    }
  },
  "202606": {
    "01. 1 A 30 D": {
      "total": 31987,
      "entregue": 15233,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 809,
        "01. ATE 2 DIAS": 3864,
        "02. ATE 5 DIAS": 8619,
        "03. ATE 7 DIAS": 2412,
        "04. ATE 10 DIAS": 699,
        "05. ACIMA DE 10 DIAS": 270
      }
    },
    "02. 31 A 60 D": {
      "total": 6239,
      "entregue": 2760,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 150,
        "01. ATE 2 DIAS": 749,
        "02. ATE 5 DIAS": 1485,
        "03. ATE 7 DIAS": 422,
        "04. ATE 10 DIAS": 142,
        "05. ACIMA DE 10 DIAS": 42
      }
    },
    "03. 61 A 90 D": {
      "total": 3672,
      "entregue": 1347,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 87,
        "01. ATE 2 DIAS": 314,
        "02. ATE 5 DIAS": 762,
        "03. ATE 7 DIAS": 244,
        "04. ATE 10 DIAS": 57,
        "05. ACIMA DE 10 DIAS": 25
      }
    },
    "04. 91 A 120 D": {
      "total": 2821,
      "entregue": 932,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 53,
        "01. ATE 2 DIAS": 225,
        "02. ATE 5 DIAS": 515,
        "03. ATE 7 DIAS": 178,
        "04. ATE 10 DIAS": 45,
        "05. ACIMA DE 10 DIAS": 16
      }
    },
    "05. 121 A 180 D": {
      "total": 4238,
      "entregue": 1179,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 82,
        "01. ATE 2 DIAS": 279,
        "02. ATE 5 DIAS": 675,
        "03. ATE 7 DIAS": 194,
        "04. ATE 10 DIAS": 64,
        "05. ACIMA DE 10 DIAS": 20
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 23782,
      "entregue": 6554,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 377,
        "01. ATE 2 DIAS": 1596,
        "02. ATE 5 DIAS": 3856,
        "03. ATE 7 DIAS": 1019,
        "04. ATE 10 DIAS": 282,
        "05. ACIMA DE 10 DIAS": 106
      }
    }
  },
  "202607": {
    "01. 1 A 30 D": {
      "total": 32864,
      "entregue": 8707,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 855,
        "01. ATE 2 DIAS": 4004,
        "02. ATE 5 DIAS": 5619,
        "03. ATE 7 DIAS": 1155,
        "04. ATE 10 DIAS": 95
      }
    },
    "02. 31 A 60 D": {
      "total": 5916,
      "entregue": 1318,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 148,
        "01. ATE 2 DIAS": 525,
        "02. ATE 5 DIAS": 898,
        "03. ATE 7 DIAS": 188,
        "04. ATE 10 DIAS": 12
      }
    },
    "03. 61 A 90 D": {
      "total": 3406,
      "entregue": 642,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 81,
        "01. ATE 2 DIAS": 268,
        "02. ATE 5 DIAS": 431,
        "03. ATE 7 DIAS": 100,
        "04. ATE 10 DIAS": 9
      }
    },
    "04. 91 A 120 D": {
      "total": 2793,
      "entregue": 444,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 51,
        "01. ATE 2 DIAS": 191,
        "02. ATE 5 DIAS": 316,
        "03. ATE 7 DIAS": 78,
        "04. ATE 10 DIAS": 2
      }
    },
    "05. 121 A 180 D": {
      "total": 4178,
      "entregue": 687,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 82,
        "01. ATE 2 DIAS": 332,
        "02. ATE 5 DIAS": 422,
        "03. ATE 7 DIAS": 101,
        "04. ATE 10 DIAS": 9
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 23335,
      "entregue": 3878,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 428,
        "01. ATE 2 DIAS": 1760,
        "02. ATE 5 DIAS": 2567,
        "03. ATE 7 DIAS": 508,
        "04. ATE 10 DIAS": 48
      }
    }
  },
  "202608": {
    "01. 1 A 30 D": {
      "total": 15992,
      "entregue": 0,
      "faixas": {}
    },
    "02. 31 A 60 D": {
      "total": 2273,
      "entregue": 0,
      "faixas": {}
    },
    "03. 61 A 90 D": {
      "total": 1435,
      "entregue": 0,
      "faixas": {}
    },
    "04. 91 A 120 D": {
      "total": 1092,
      "entregue": 0,
      "faixas": {}
    },
    "05. 121 A 180 D": {
      "total": 1320,
      "entregue": 0,
      "faixas": {}
    },
    "06. ACIMA DE 180 D": {
      "total": 73,
      "entregue": 0,
      "faixas": {}
    }
  },
  "202609": {
    "01. 1 A 30 D": {
      "total": 25877,
      "entregue": 1,
      "faixas": {
        "05. ACIMA DE 10 DIAS": 1
      }
    },
    "02. 31 A 60 D": {
      "total": 3597,
      "entregue": 0,
      "faixas": {}
    },
    "03. 61 A 90 D": {
      "total": 2208,
      "entregue": 0,
      "faixas": {}
    },
    "04. 91 A 120 D": {
      "total": 1650,
      "entregue": 0,
      "faixas": {}
    },
    "05. 121 A 180 D": {
      "total": 659,
      "entregue": 3,
      "faixas": {
        "02. ATE 5 DIAS": 3
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 104,
      "entregue": 1,
      "faixas": {
        "02. ATE 5 DIAS": 1
      }
    }
  },
  "202610": {
    "01. 1 A 30 D": {
      "total": 37504,
      "entregue": 25,
      "faixas": {
        "01. ATE 2 DIAS": 6,
        "02. ATE 5 DIAS": 15,
        "03. ATE 7 DIAS": 2,
        "04. ATE 10 DIAS": 1,
        "05. ACIMA DE 10 DIAS": 1
      }
    },
    "02. 31 A 60 D": {
      "total": 5133,
      "entregue": 1,
      "faixas": {
        "05. ACIMA DE 10 DIAS": 1
      }
    },
    "03. 61 A 90 D": {
      "total": 3143,
      "entregue": 0,
      "faixas": {}
    },
    "04. 91 A 120 D": {
      "total": 1062,
      "entregue": 1,
      "faixas": {
        "02. ATE 5 DIAS": 1
      }
    },
    "05. 121 A 180 D": {
      "total": 31,
      "entregue": 3,
      "faixas": {
        "02. ATE 5 DIAS": 1,
        "03. ATE 7 DIAS": 2
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 143,
      "entregue": 8,
      "faixas": {
        "02. ATE 5 DIAS": 3,
        "04. ATE 10 DIAS": 2,
        "05. ACIMA DE 10 DIAS": 3
      }
    }
  },
  "202611": {
    "01. 1 A 30 D": {
      "total": 13202,
      "entregue": 2,
      "faixas": {
        "03. ATE 7 DIAS": 2
      }
    },
    "02. 31 A 60 D": {
      "total": 1774,
      "entregue": 0,
      "faixas": {}
    },
    "03. 61 A 90 D": {
      "total": 525,
      "entregue": 0,
      "faixas": {}
    },
    "04. 91 A 120 D": {
      "total": 8,
      "entregue": 0,
      "faixas": {}
    },
    "05. 121 A 180 D": {
      "total": 6,
      "entregue": 0,
      "faixas": {}
    },
    "06. ACIMA DE 180 D": {
      "total": 51,
      "entregue": 0,
      "faixas": {}
    }
  },
  "202612": {
    "01. 1 A 30 D": {
      "total": 33735,
      "entregue": 0,
      "faixas": {}
    },
    "02. 31 A 60 D": {
      "total": 2323,
      "entregue": 0,
      "faixas": {}
    },
    "03. 61 A 90 D": {
      "total": 20,
      "entregue": 0,
      "faixas": {}
    },
    "04. 91 A 120 D": {
      "total": 11,
      "entregue": 0,
      "faixas": {}
    },
    "05. 121 A 180 D": {
      "total": 17,
      "entregue": 0,
      "faixas": {}
    },
    "06. ACIMA DE 180 D": {
      "total": 80,
      "entregue": 2,
      "faixas": {
        "02. ATE 5 DIAS": 1,
        "05. ACIMA DE 10 DIAS": 1
      }
    }
  }
};

const TOTAL_GRUPO1 = {"202504": 19, "202505": 1354, "202506": 20139, "202507": 37719, "202508": 47962, "202509": 76547, "202510": 65817, "202511": 98322, "202512": 111276, "202601": 54281, "202602": 29549, "202603": 22877, "202604": 34155, "202605": 55216, "202606": 72739, "202607": 72492, "202608": 22185, "202609": 34095, "202610": 47016, "202611": 15566, "202612": 36186};
const TOTAL_GRUPO2 = {"202503": 3, "202504": 7, "202505": 6180, "202506": 81730, "202507": 193506, "202508": 222975, "202509": 297880, "202510": 228972, "202511": 357199, "202512": 374711, "202601": 179151, "202602": 83938, "202603": 66751, "202604": 98439, "202605": 169058, "202606": 222731, "202607": 201080, "202608": 184342, "202609": 305589, "202610": 424111, "202611": 164463, "202612": 392875};
const TOTAL_EXPIRADO = {"202504": 19, "202505": 1354, "202506": 20139, "202507": 37719, "202508": 47962, "202509": 76547, "202510": 65817, "202511": 98322, "202512": 111276, "202601": 54281, "202602": 29549, "202603": 22877, "202604": 34155, "202605": 55216, "202606": 72739, "202607": 72492, "202608": 22185, "202609": 34095, "202610": 47016, "202611": 15566, "202612": 36186};

// ── BREAKDOWN POR PRODUTO ────────────────────────────────────
const MONTHLY_HIBRIDO = [{"mes": "Abr/25", "ren": 14, "rei": 1}, {"mes": "Mai/25", "ren": 901, "rei": 43}, {"mes": "Jun/25", "ren": 13864, "rei": 728}, {"mes": "Jul/25", "ren": 25516, "rei": 1116}, {"mes": "Ago/25", "ren": 32094, "rei": 1272}, {"mes": "Set/25", "ren": 54165, "rei": 1755}, {"mes": "Out/25", "ren": 45210, "rei": 1214}, {"mes": "Nov/25", "ren": 67448, "rei": 1913}, {"mes": "Dez/25", "ren": 77007, "rei": 3279}, {"mes": "Jan/26", "ren": 38023, "rei": 1694}, {"mes": "Fev/26", "ren": 20569, "rei": 1250}, {"mes": "Mar/26", "ren": 15923, "rei": 916}, {"mes": "Abr/26", "ren": 23863, "rei": 900}, {"mes": "Mai/26", "ren": 32786, "rei": 0}, {"mes": "Jun/26", "ren": 28759, "rei": 0}, {"mes": "Jul/26", "ren": 20452, "rei": 0}, {"mes": "Set/26", "ren": 3, "rei": 0}, {"mes": "Out/26", "ren": 25, "rei": 0}, {"mes": "Nov/26", "ren": 1, "rei": 0}, {"mes": "Dez/26", "ren": 2, "rei": 0}];
const MONTHLY_DEBITO  = [{"mes": "Mai/25", "ren": 174, "rei": 23}, {"mes": "Jun/25", "ren": 2105, "rei": 266}, {"mes": "Jul/25", "ren": 3985, "rei": 457}, {"mes": "Ago/25", "ren": 5166, "rei": 575}, {"mes": "Set/25", "ren": 8173, "rei": 666}, {"mes": "Out/25", "ren": 7143, "rei": 654}, {"mes": "Nov/25", "ren": 9912, "rei": 949}, {"mes": "Dez/25", "ren": 9784, "rei": 1014}, {"mes": "Jan/26", "ren": 4855, "rei": 462}, {"mes": "Fev/26", "ren": 1907, "rei": 263}, {"mes": "Mar/26", "ren": 1382, "rei": 203}, {"mes": "Abr/26", "ren": 2099, "rei": 192}, {"mes": "Mai/26", "ren": 2612, "rei": 0}, {"mes": "Jun/26", "ren": 1975, "rei": 0}, {"mes": "Jul/26", "ren": 831, "rei": 0}, {"mes": "Ago/26", "ren": 0, "rei": 0}, {"mes": "Set/26", "ren": 2, "rei": 0}, {"mes": "Out/26", "ren": 13, "rei": 0}, {"mes": "Nov/26", "ren": 1, "rei": 0}, {"mes": "Dez/26", "ren": 0, "rei": 0}];

const MONTHLY_G2 = [{"mes": "Mar/25", "ren": 0, "rei": 0, "tel": 3}, {"mes": "Abr/25", "ren": 0, "rei": 0, "tel": 7}, {"mes": "Mai/25", "ren": 155, "rei": 171, "tel": 6180}, {"mes": "Jun/25", "ren": 2922, "rei": 1847, "tel": 81730}, {"mes": "Jul/25", "ren": 7732, "rei": 3808, "tel": 193506}, {"mes": "Ago/25", "ren": 8162, "rei": 4880, "tel": 222975}, {"mes": "Set/25", "ren": 8036, "rei": 6740, "tel": 297880}, {"mes": "Out/25", "ren": 7884, "rei": 3564, "tel": 228972}, {"mes": "Nov/25", "ren": 13305, "rei": 6597, "tel": 357199}, {"mes": "Dez/25", "ren": 16299, "rei": 7588, "tel": 374711}, {"mes": "Jan/26", "ren": 9973, "rei": 3559, "tel": 179151}, {"mes": "Fev/26", "ren": 5041, "rei": 1606, "tel": 83938}, {"mes": "Mar/26", "ren": 4178, "rei": 1123, "tel": 66751}, {"mes": "Abr/26", "ren": 6537, "rei": 1216, "tel": 98439}, {"mes": "Mai/26", "ren": 6053, "rei": 0, "tel": 169058}, {"mes": "Jun/26", "ren": 5194, "rei": 0, "tel": 222731}, {"mes": "Jul/26", "ren": 1869, "rei": 0, "tel": 201080}, {"mes": "Ago/26", "ren": 0, "rei": 0, "tel": 184342}, {"mes": "Set/26", "ren": 3, "rei": 0, "tel": 305589}, {"mes": "Out/26", "ren": 22, "rei": 0, "tel": 424111}, {"mes": "Nov/26", "ren": 0, "rei": 0, "tel": 164463}, {"mes": "Dez/26", "ren": 4, "rei": 0, "tel": 392875}];

// ── GRÁFICO CURVA ACUMULADA DE RENOVAÇÕES ─────────────────────
const GRAFICO_CAMPANHAS = {"2025-07": {"Reissue": [{"x": 1, "y": 81.61}, {"x": 2, "y": 81.97}, {"x": 3, "y": 82.23}, {"x": 4, "y": 82.65}, {"x": 5, "y": 83.09}, {"x": 6, "y": 83.43}, {"x": 7, "y": 83.68}, {"x": 8, "y": 83.91}, {"x": 9, "y": 84.11}, {"x": 10, "y": 84.23}, {"x": 11, "y": 84.45}, {"x": 12, "y": 84.65}, {"x": 13, "y": 84.85}, {"x": 14, "y": 85.04}, {"x": 15, "y": 85.21}, {"x": 16, "y": 85.36}, {"x": 17, "y": 85.46}, {"x": 18, "y": 85.64}, {"x": 19, "y": 85.89}, {"x": 20, "y": 86.04}, {"x": 21, "y": 86.18}, {"x": 22, "y": 86.33}, {"x": 23, "y": 86.45}, {"x": 24, "y": 86.54}, {"x": 25, "y": 86.71}, {"x": 26, "y": 86.88}, {"x": 27, "y": 87.03}, {"x": 28, "y": 87.13}, {"x": 29, "y": 87.23}, {"x": 30, "y": 87.32}, {"x": 31, "y": 87.42}, {"x": 32, "y": 97.03}], "Renovación": [{"x": -108, "y": 0.0}, {"x": -60, "y": 0.01}, {"x": -58, "y": 3.24}, {"x": -57, "y": 6.24}, {"x": -56, "y": 6.62}, {"x": -55, "y": 6.82}, {"x": -54, "y": 6.94}, {"x": -53, "y": 7.02}, {"x": -52, "y": 7.15}, {"x": -51, "y": 7.25}, {"x": -50, "y": 7.25}, {"x": -49, "y": 7.25}, {"x": -47, "y": 7.26}, {"x": -46, "y": 7.26}, {"x": -45, "y": 7.26}, {"x": -44, "y": 7.27}, {"x": -42, "y": 7.27}, {"x": -41, "y": 7.27}, {"x": -38, "y": 7.27}, {"x": -36, "y": 7.28}, {"x": -35, "y": 7.29}, {"x": -34, "y": 7.29}, {"x": -33, "y": 7.3}, {"x": -32, "y": 7.3}, {"x": -31, "y": 7.3}, {"x": -30, "y": 21.05}, {"x": -29, "y": 24.53}, {"x": -28, "y": 25.27}, {"x": -27, "y": 25.62}, {"x": -26, "y": 26.92}, {"x": -25, "y": 31.34}, {"x": -24, "y": 36.57}, {"x": -23, "y": 39.59}, {"x": -22, "y": 41.88}, {"x": -21, "y": 44.91}, {"x": -20, "y": 49.79}, {"x": -19, "y": 52.3}, {"x": -18, "y": 54.0}, {"x": -17, "y": 56.13}, {"x": -16, "y": 60.41}, {"x": -15, "y": 63.16}, {"x": -14, "y": 64.88}, {"x": -13, "y": 66.2}, {"x": -12, "y": 66.98}, {"x": -11, "y": 68.09}, {"x": -10, "y": 69.35}, {"x": -9, "y": 70.22}, {"x": -8, "y": 70.86}, {"x": -7, "y": 71.35}, {"x": -6, "y": 72.79}, {"x": -5, "y": 73.9}, {"x": -4, "y": 74.56}, {"x": -3, "y": 75.42}, {"x": -2, "y": 76.04}, {"x": -1, "y": 77.47}, {"x": 0, "y": 78.33}, {"x": 1, "y": 81.61}]}, "2025-08": {"Reissue": [{"x": 1, "y": 81.76}, {"x": 2, "y": 82.19}, {"x": 3, "y": 82.57}, {"x": 4, "y": 82.9}, {"x": 5, "y": 83.17}, {"x": 6, "y": 83.4}, {"x": 7, "y": 83.56}, {"x": 8, "y": 83.78}, {"x": 9, "y": 84.02}, {"x": 10, "y": 84.26}, {"x": 11, "y": 84.45}, {"x": 12, "y": 84.63}, {"x": 13, "y": 84.8}, {"x": 14, "y": 84.91}, {"x": 15, "y": 85.12}, {"x": 16, "y": 85.37}, {"x": 17, "y": 85.53}, {"x": 18, "y": 85.68}, {"x": 19, "y": 85.79}, {"x": 20, "y": 85.93}, {"x": 21, "y": 86.02}, {"x": 22, "y": 86.19}, {"x": 23, "y": 86.35}, {"x": 24, "y": 86.47}, {"x": 25, "y": 86.64}, {"x": 26, "y": 86.79}, {"x": 27, "y": 86.91}, {"x": 28, "y": 86.99}, {"x": 29, "y": 87.11}, {"x": 30, "y": 87.24}, {"x": 31, "y": 96.52}], "Renovación": [{"x": -88, "y": 4.82}, {"x": -87, "y": 5.83}, {"x": -86, "y": 6.1}, {"x": -85, "y": 6.21}, {"x": -84, "y": 6.28}, {"x": -83, "y": 6.42}, {"x": -82, "y": 6.51}, {"x": -81, "y": 6.55}, {"x": -80, "y": 6.56}, {"x": -79, "y": 6.56}, {"x": -77, "y": 6.56}, {"x": -75, "y": 6.56}, {"x": -73, "y": 6.56}, {"x": -72, "y": 6.57}, {"x": -71, "y": 6.57}, {"x": -68, "y": 6.57}, {"x": -67, "y": 6.57}, {"x": -66, "y": 6.59}, {"x": -65, "y": 6.59}, {"x": -64, "y": 6.59}, {"x": -63, "y": 6.59}, {"x": -62, "y": 6.6}, {"x": -61, "y": 17.24}, {"x": -60, "y": 22.55}, {"x": -59, "y": 23.32}, {"x": -58, "y": 23.72}, {"x": -57, "y": 23.89}, {"x": -56, "y": 24.05}, {"x": -55, "y": 24.3}, {"x": -54, "y": 24.49}, {"x": -53, "y": 24.51}, {"x": -52, "y": 24.53}, {"x": -51, "y": 24.55}, {"x": -50, "y": 24.56}, {"x": -49, "y": 24.58}, {"x": -48, "y": 24.59}, {"x": -47, "y": 24.61}, {"x": -46, "y": 24.63}, {"x": -45, "y": 24.65}, {"x": -44, "y": 24.66}, {"x": -43, "y": 24.67}, {"x": -42, "y": 24.67}, {"x": -41, "y": 24.69}, {"x": -40, "y": 24.71}, {"x": -39, "y": 24.71}, {"x": -38, "y": 24.72}, {"x": -37, "y": 24.75}, {"x": -36, "y": 24.76}, {"x": -35, "y": 24.77}, {"x": -34, "y": 24.79}, {"x": -33, "y": 24.8}, {"x": -32, "y": 24.8}, {"x": -31, "y": 24.83}, {"x": -30, "y": 31.04}, {"x": -29, "y": 33.19}, {"x": -28, "y": 33.6}, {"x": -27, "y": 33.95}, {"x": -26, "y": 35.44}, {"x": -25, "y": 40.42}, {"x": -24, "y": 43.57}, {"x": -23, "y": 45.63}, {"x": -22, "y": 46.98}, {"x": -21, "y": 48.47}, {"x": -20, "y": 53.55}, {"x": -19, "y": 56.36}, {"x": -18, "y": 58.27}, {"x": -17, "y": 59.77}, {"x": -16, "y": 62.59}, {"x": -15, "y": 64.23}, {"x": -14, "y": 65.33}, {"x": -13, "y": 66.83}, {"x": -12, "y": 67.93}, {"x": -11, "y": 69.39}, {"x": -10, "y": 70.18}, {"x": -9, "y": 70.79}, {"x": -8, "y": 71.2}, {"x": -7, "y": 71.55}, {"x": -6, "y": 73.04}, {"x": -5, "y": 74.48}, {"x": -4, "y": 75.29}, {"x": -3, "y": 75.98}, {"x": -2, "y": 76.5}, {"x": -1, "y": 77.3}, {"x": 0, "y": 77.86}, {"x": 1, "y": 81.76}]}, "2025-09": {"Reissue": [{"x": 1, "y": 91.61}, {"x": 2, "y": 92.06}, {"x": 3, "y": 92.37}, {"x": 4, "y": 92.56}, {"x": 5, "y": 92.71}, {"x": 6, "y": 93.07}, {"x": 7, "y": 93.29}, {"x": 8, "y": 93.52}, {"x": 9, "y": 93.75}, {"x": 10, "y": 93.94}, {"x": 11, "y": 94.09}, {"x": 12, "y": 94.2}, {"x": 13, "y": 94.31}, {"x": 14, "y": 94.46}, {"x": 15, "y": 95.4}, {"x": 16, "y": 96.0}, {"x": 17, "y": 96.26}, {"x": 18, "y": 96.48}, {"x": 19, "y": 96.66}, {"x": 20, "y": 96.98}, {"x": 21, "y": 97.34}, {"x": 22, "y": 97.91}, {"x": 23, "y": 98.29}, {"x": 24, "y": 98.52}, {"x": 25, "y": 98.78}, {"x": 26, "y": 98.96}, {"x": 27, "y": 99.68}, {"x": 28, "y": 100.41}, {"x": 29, "y": 100.6}, {"x": 30, "y": 100.77}, {"x": 31, "y": 101.04}, {"x": 32, "y": 117.49}], "Renovación": [{"x": -112, "y": 0.0}, {"x": -105, "y": 0.0}, {"x": -95, "y": 0.0}, {"x": -91, "y": 18.5}, {"x": -90, "y": 26.92}, {"x": -89, "y": 28.0}, {"x": -88, "y": 28.55}, {"x": -87, "y": 28.82}, {"x": -86, "y": 29.03}, {"x": -85, "y": 29.3}, {"x": -84, "y": 29.52}, {"x": -83, "y": 29.57}, {"x": -82, "y": 29.6}, {"x": -81, "y": 29.61}, {"x": -80, "y": 29.62}, {"x": -79, "y": 29.64}, {"x": -78, "y": 29.65}, {"x": -77, "y": 29.67}, {"x": -76, "y": 29.71}, {"x": -75, "y": 29.74}, {"x": -74, "y": 29.75}, {"x": -73, "y": 29.76}, {"x": -72, "y": 29.77}, {"x": -71, "y": 29.78}, {"x": -70, "y": 29.79}, {"x": -69, "y": 29.8}, {"x": -68, "y": 29.8}, {"x": -67, "y": 29.84}, {"x": -66, "y": 29.86}, {"x": -65, "y": 29.87}, {"x": -64, "y": 29.88}, {"x": -63, "y": 29.89}, {"x": -62, "y": 29.9}, {"x": -61, "y": 29.93}, {"x": -60, "y": 37.78}, {"x": -59, "y": 40.22}, {"x": -58, "y": 40.66}, {"x": -57, "y": 41.03}, {"x": -56, "y": 41.3}, {"x": -55, "y": 41.49}, {"x": -54, "y": 41.65}, {"x": -53, "y": 41.76}, {"x": -52, "y": 41.78}, {"x": -51, "y": 41.79}, {"x": -50, "y": 41.8}, {"x": -49, "y": 41.82}, {"x": -48, "y": 41.83}, {"x": -47, "y": 41.84}, {"x": -46, "y": 41.85}, {"x": -45, "y": 41.86}, {"x": -44, "y": 41.87}, {"x": -43, "y": 41.9}, {"x": -42, "y": 41.94}, {"x": -41, "y": 41.95}, {"x": -40, "y": 41.96}, {"x": -39, "y": 41.97}, {"x": -38, "y": 41.98}, {"x": -37, "y": 41.98}, {"x": -36, "y": 42.01}, {"x": -35, "y": 42.02}, {"x": -34, "y": 42.03}, {"x": -33, "y": 42.04}, {"x": -32, "y": 42.05}, {"x": -31, "y": 42.05}, {"x": -30, "y": 42.07}, {"x": -29, "y": 47.39}, {"x": -28, "y": 48.88}, {"x": -27, "y": 49.2}, {"x": -26, "y": 50.27}, {"x": -25, "y": 54.24}, {"x": -24, "y": 56.07}, {"x": -23, "y": 57.17}, {"x": -22, "y": 58.97}, {"x": -21, "y": 60.82}, {"x": -20, "y": 63.93}, {"x": -19, "y": 65.91}, {"x": -18, "y": 67.27}, {"x": -17, "y": 68.19}, {"x": -16, "y": 68.94}, {"x": -15, "y": 71.82}, {"x": -14, "y": 73.28}, {"x": -13, "y": 74.32}, {"x": -12, "y": 75.12}, {"x": -11, "y": 75.72}, {"x": -10, "y": 76.38}, {"x": -9, "y": 76.71}, {"x": -8, "y": 77.43}, {"x": -7, "y": 77.98}, {"x": -6, "y": 78.51}, {"x": -5, "y": 79.8}, {"x": -4, "y": 80.48}, {"x": -3, "y": 80.84}, {"x": -2, "y": 81.12}, {"x": -1, "y": 81.53}, {"x": 0, "y": 82.2}, {"x": 1, "y": 91.61}]}, "2025-10": {"Reissue": [{"x": 1, "y": 85.74}, {"x": 2, "y": 85.97}, {"x": 3, "y": 86.62}, {"x": 4, "y": 87.5}, {"x": 5, "y": 88.74}, {"x": 6, "y": 89.46}, {"x": 7, "y": 89.89}, {"x": 8, "y": 90.03}, {"x": 9, "y": 90.15}, {"x": 10, "y": 90.35}, {"x": 11, "y": 90.63}, {"x": 12, "y": 91.32}, {"x": 13, "y": 91.5}, {"x": 14, "y": 91.62}, {"x": 15, "y": 92.09}, {"x": 16, "y": 92.29}, {"x": 17, "y": 92.55}, {"x": 18, "y": 92.78}, {"x": 19, "y": 93.01}, {"x": 20, "y": 93.21}, {"x": 21, "y": 93.4}, {"x": 22, "y": 93.57}, {"x": 23, "y": 93.71}, {"x": 24, "y": 93.94}, {"x": 25, "y": 94.26}, {"x": 26, "y": 94.46}, {"x": 27, "y": 94.63}, {"x": 28, "y": 94.86}, {"x": 29, "y": 95.01}, {"x": 30, "y": 95.24}, {"x": 31, "y": 111.22}], "Renovación": [{"x": -107, "y": 0.08}, {"x": -106, "y": 0.11}, {"x": -105, "y": 0.11}, {"x": -103, "y": 0.11}, {"x": -102, "y": 0.11}, {"x": -101, "y": 0.11}, {"x": -98, "y": 0.14}, {"x": -97, "y": 0.15}, {"x": -96, "y": 0.16}, {"x": -94, "y": 0.17}, {"x": -92, "y": 0.22}, {"x": -91, "y": 6.82}, {"x": -90, "y": 21.72}, {"x": -89, "y": 23.06}, {"x": -88, "y": 24.11}, {"x": -87, "y": 24.68}, {"x": -86, "y": 25.08}, {"x": -85, "y": 25.4}, {"x": -84, "y": 25.62}, {"x": -83, "y": 25.69}, {"x": -82, "y": 25.72}, {"x": -81, "y": 25.76}, {"x": -80, "y": 25.78}, {"x": -79, "y": 25.8}, {"x": -78, "y": 25.82}, {"x": -77, "y": 25.83}, {"x": -76, "y": 25.84}, {"x": -75, "y": 25.85}, {"x": -74, "y": 25.87}, {"x": -73, "y": 25.92}, {"x": -72, "y": 25.94}, {"x": -71, "y": 25.94}, {"x": -70, "y": 25.95}, {"x": -69, "y": 25.96}, {"x": -68, "y": 25.97}, {"x": -67, "y": 26.04}, {"x": -66, "y": 26.07}, {"x": -65, "y": 26.08}, {"x": -64, "y": 26.09}, {"x": -62, "y": 26.1}, {"x": -61, "y": 26.15}, {"x": -60, "y": 35.21}, {"x": -59, "y": 37.38}, {"x": -58, "y": 37.84}, {"x": -57, "y": 38.14}, {"x": -56, "y": 38.34}, {"x": -55, "y": 38.44}, {"x": -54, "y": 38.52}, {"x": -53, "y": 38.62}, {"x": -52, "y": 38.69}, {"x": -51, "y": 38.79}, {"x": -50, "y": 38.84}, {"x": -49, "y": 38.89}, {"x": -48, "y": 38.92}, {"x": -47, "y": 38.94}, {"x": -46, "y": 38.99}, {"x": -45, "y": 39.06}, {"x": -44, "y": 39.1}, {"x": -43, "y": 39.14}, {"x": -42, "y": 39.17}, {"x": -41, "y": 39.19}, {"x": -40, "y": 39.21}, {"x": -39, "y": 39.27}, {"x": -38, "y": 39.3}, {"x": -37, "y": 39.33}, {"x": -36, "y": 39.41}, {"x": -35, "y": 39.46}, {"x": -34, "y": 39.49}, {"x": -33, "y": 39.51}, {"x": -32, "y": 39.54}, {"x": -31, "y": 39.6}, {"x": -30, "y": 44.71}, {"x": -29, "y": 45.96}, {"x": -28, "y": 46.34}, {"x": -27, "y": 46.48}, {"x": -26, "y": 47.17}, {"x": -25, "y": 52.61}, {"x": -24, "y": 55.88}, {"x": -23, "y": 57.78}, {"x": -22, "y": 59.32}, {"x": -21, "y": 61.06}, {"x": -20, "y": 63.31}, {"x": -19, "y": 64.48}, {"x": -18, "y": 66.23}, {"x": -17, "y": 67.53}, {"x": -16, "y": 69.6}, {"x": -15, "y": 71.26}, {"x": -14, "y": 72.45}, {"x": -13, "y": 73.12}, {"x": -12, "y": 73.69}, {"x": -11, "y": 74.83}, {"x": -10, "y": 75.87}, {"x": -9, "y": 76.55}, {"x": -8, "y": 77.09}, {"x": -7, "y": 77.54}, {"x": -6, "y": 78.18}, {"x": -5, "y": 78.59}, {"x": -4, "y": 79.12}, {"x": -3, "y": 79.55}, {"x": -2, "y": 79.88}, {"x": -1, "y": 80.19}, {"x": 0, "y": 80.98}, {"x": 1, "y": 85.74}]}, "2025-11": {"Reissue": [{"x": 1, "y": 87.32}, {"x": 2, "y": 87.66}, {"x": 3, "y": 87.91}, {"x": 4, "y": 88.09}, {"x": 5, "y": 88.36}, {"x": 6, "y": 88.56}, {"x": 7, "y": 88.7}, {"x": 8, "y": 88.86}, {"x": 9, "y": 88.99}, {"x": 10, "y": 89.17}, {"x": 11, "y": 89.34}, {"x": 12, "y": 89.48}, {"x": 13, "y": 89.61}, {"x": 14, "y": 89.71}, {"x": 15, "y": 89.95}, {"x": 16, "y": 90.13}, {"x": 17, "y": 90.3}, {"x": 18, "y": 90.46}, {"x": 19, "y": 90.62}, {"x": 20, "y": 90.75}, {"x": 21, "y": 90.86}, {"x": 22, "y": 91.01}, {"x": 23, "y": 91.16}, {"x": 24, "y": 91.26}, {"x": 25, "y": 91.35}, {"x": 26, "y": 91.47}, {"x": 27, "y": 91.57}, {"x": 28, "y": 91.64}, {"x": 29, "y": 91.75}, {"x": 30, "y": 91.87}, {"x": 31, "y": 91.99}, {"x": 32, "y": 98.02}], "Renovación": [{"x": -104, "y": 0.04}, {"x": -103, "y": 0.13}, {"x": -102, "y": 0.14}, {"x": -101, "y": 0.15}, {"x": -100, "y": 0.15}, {"x": -99, "y": 0.15}, {"x": -98, "y": 0.15}, {"x": -97, "y": 0.21}, {"x": -96, "y": 0.22}, {"x": -95, "y": 0.23}, {"x": -94, "y": 0.23}, {"x": -93, "y": 0.24}, {"x": -92, "y": 0.24}, {"x": -91, "y": 0.29}, {"x": -90, "y": 2.53}, {"x": -89, "y": 20.95}, {"x": -88, "y": 24.39}, {"x": -87, "y": 25.24}, {"x": -86, "y": 25.66}, {"x": -85, "y": 25.86}, {"x": -84, "y": 25.99}, {"x": -83, "y": 26.13}, {"x": -82, "y": 26.28}, {"x": -81, "y": 26.38}, {"x": -80, "y": 26.45}, {"x": -79, "y": 26.52}, {"x": -78, "y": 26.56}, {"x": -77, "y": 26.6}, {"x": -76, "y": 26.69}, {"x": -75, "y": 26.77}, {"x": -74, "y": 26.8}, {"x": -73, "y": 26.85}, {"x": -72, "y": 26.89}, {"x": -71, "y": 26.92}, {"x": -70, "y": 26.95}, {"x": -69, "y": 27.03}, {"x": -68, "y": 27.08}, {"x": -67, "y": 27.13}, {"x": -66, "y": 27.23}, {"x": -65, "y": 27.28}, {"x": -64, "y": 27.32}, {"x": -63, "y": 27.35}, {"x": -62, "y": 27.38}, {"x": -61, "y": 27.44}, {"x": -60, "y": 34.32}, {"x": -59, "y": 36.94}, {"x": -58, "y": 37.39}, {"x": -57, "y": 37.57}, {"x": -56, "y": 37.71}, {"x": -55, "y": 37.91}, {"x": -54, "y": 38.04}, {"x": -53, "y": 38.12}, {"x": -52, "y": 38.14}, {"x": -51, "y": 38.15}, {"x": -50, "y": 38.15}, {"x": -49, "y": 38.17}, {"x": -48, "y": 38.17}, {"x": -47, "y": 38.18}, {"x": -46, "y": 38.24}, {"x": -45, "y": 38.28}, {"x": -44, "y": 38.32}, {"x": -43, "y": 38.35}, {"x": -42, "y": 38.38}, {"x": -41, "y": 38.43}, {"x": -40, "y": 38.46}, {"x": -39, "y": 38.5}, {"x": -38, "y": 38.54}, {"x": -37, "y": 38.56}, {"x": -36, "y": 38.6}, {"x": -35, "y": 38.61}, {"x": -34, "y": 38.63}, {"x": -33, "y": 38.65}, {"x": -32, "y": 38.67}, {"x": -31, "y": 38.7}, {"x": -30, "y": 38.73}, {"x": -29, "y": 43.16}, {"x": -28, "y": 44.19}, {"x": -27, "y": 44.66}, {"x": -26, "y": 45.88}, {"x": -25, "y": 50.99}, {"x": -24, "y": 54.24}, {"x": -23, "y": 56.44}, {"x": -22, "y": 57.75}, {"x": -21, "y": 59.1}, {"x": -20, "y": 62.79}, {"x": -19, "y": 65.12}, {"x": -18, "y": 66.68}, {"x": -17, "y": 67.81}, {"x": -16, "y": 68.84}, {"x": -15, "y": 70.74}, {"x": -14, "y": 71.75}, {"x": -13, "y": 72.91}, {"x": -12, "y": 73.83}, {"x": -11, "y": 74.54}, {"x": -10, "y": 75.42}, {"x": -9, "y": 76.1}, {"x": -8, "y": 76.52}, {"x": -7, "y": 76.86}, {"x": -6, "y": 77.43}, {"x": -5, "y": 78.44}, {"x": -4, "y": 78.97}, {"x": -3, "y": 79.36}, {"x": -2, "y": 79.83}, {"x": -1, "y": 80.12}, {"x": 0, "y": 80.75}, {"x": 1, "y": 87.32}]}, "2025-12": {"Reissue": [{"x": 1, "y": 82.97}, {"x": 2, "y": 83.37}, {"x": 3, "y": 83.64}, {"x": 4, "y": 83.82}, {"x": 5, "y": 84.15}, {"x": 6, "y": 84.41}, {"x": 7, "y": 84.62}, {"x": 8, "y": 84.86}, {"x": 9, "y": 85.06}, {"x": 10, "y": 85.23}, {"x": 11, "y": 85.35}, {"x": 12, "y": 85.54}, {"x": 13, "y": 85.71}, {"x": 14, "y": 85.88}, {"x": 15, "y": 86.11}, {"x": 16, "y": 86.27}, {"x": 17, "y": 86.44}, {"x": 18, "y": 86.55}, {"x": 19, "y": 86.73}, {"x": 20, "y": 86.89}, {"x": 21, "y": 87.06}, {"x": 22, "y": 87.19}, {"x": 23, "y": 87.32}, {"x": 24, "y": 87.44}, {"x": 25, "y": 87.54}, {"x": 26, "y": 87.68}, {"x": 27, "y": 87.81}, {"x": 28, "y": 87.91}, {"x": 29, "y": 88.03}, {"x": 30, "y": 88.15}, {"x": 31, "y": 88.25}, {"x": 32, "y": 91.8}], "Renovación": [{"x": -107, "y": 0.02}, {"x": -106, "y": 0.07}, {"x": -105, "y": 0.07}, {"x": -104, "y": 0.08}, {"x": -103, "y": 0.08}, {"x": -102, "y": 0.09}, {"x": -101, "y": 0.09}, {"x": -100, "y": 0.1}, {"x": -99, "y": 0.11}, {"x": -98, "y": 0.12}, {"x": -97, "y": 0.17}, {"x": -96, "y": 0.2}, {"x": -95, "y": 0.2}, {"x": -94, "y": 0.21}, {"x": -93, "y": 0.22}, {"x": -92, "y": 0.23}, {"x": -91, "y": 1.9}, {"x": -90, "y": 19.05}, {"x": -89, "y": 21.42}, {"x": -88, "y": 21.95}, {"x": -87, "y": 22.27}, {"x": -86, "y": 22.66}, {"x": -85, "y": 22.91}, {"x": -84, "y": 23.1}, {"x": -83, "y": 23.2}, {"x": -82, "y": 23.21}, {"x": -81, "y": 23.23}, {"x": -80, "y": 23.23}, {"x": -79, "y": 23.25}, {"x": -78, "y": 23.27}, {"x": -77, "y": 23.31}, {"x": -76, "y": 23.35}, {"x": -75, "y": 23.37}, {"x": -74, "y": 23.4}, {"x": -73, "y": 23.42}, {"x": -72, "y": 23.46}, {"x": -71, "y": 23.5}, {"x": -70, "y": 23.53}, {"x": -69, "y": 23.56}, {"x": -68, "y": 23.58}, {"x": -67, "y": 23.6}, {"x": -66, "y": 23.62}, {"x": -65, "y": 23.64}, {"x": -64, "y": 23.66}, {"x": -63, "y": 23.67}, {"x": -62, "y": 23.69}, {"x": -61, "y": 23.71}, {"x": -60, "y": 30.17}, {"x": -59, "y": 32.72}, {"x": -58, "y": 33.52}, {"x": -57, "y": 33.82}, {"x": -56, "y": 33.98}, {"x": -55, "y": 34.13}, {"x": -54, "y": 34.23}, {"x": -53, "y": 34.3}, {"x": -52, "y": 34.31}, {"x": -51, "y": 34.33}, {"x": -50, "y": 34.34}, {"x": -49, "y": 34.34}, {"x": -48, "y": 34.35}, {"x": -47, "y": 34.36}, {"x": -46, "y": 34.41}, {"x": -45, "y": 34.43}, {"x": -44, "y": 34.47}, {"x": -43, "y": 34.67}, {"x": -42, "y": 34.89}, {"x": -41, "y": 35.1}, {"x": -40, "y": 35.31}, {"x": -39, "y": 35.49}, {"x": -38, "y": 35.66}, {"x": -37, "y": 35.88}, {"x": -36, "y": 36.08}, {"x": -35, "y": 36.3}, {"x": -34, "y": 36.5}, {"x": -33, "y": 36.69}, {"x": -32, "y": 36.84}, {"x": -31, "y": 36.99}, {"x": -30, "y": 42.18}, {"x": -29, "y": 44.29}, {"x": -28, "y": 44.69}, {"x": -27, "y": 44.88}, {"x": -26, "y": 46.21}, {"x": -25, "y": 50.26}, {"x": -24, "y": 52.43}, {"x": -23, "y": 55.19}, {"x": -22, "y": 57.29}, {"x": -21, "y": 59.47}, {"x": -20, "y": 62.65}, {"x": -19, "y": 64.64}, {"x": -18, "y": 65.83}, {"x": -17, "y": 66.69}, {"x": -16, "y": 69.23}, {"x": -15, "y": 70.8}, {"x": -14, "y": 71.89}, {"x": -13, "y": 72.76}, {"x": -12, "y": 73.58}, {"x": -11, "y": 74.33}, {"x": -10, "y": 74.77}, {"x": -9, "y": 75.4}, {"x": -8, "y": 75.9}, {"x": -7, "y": 76.19}, {"x": -6, "y": 76.82}, {"x": -5, "y": 77.38}, {"x": -4, "y": 77.76}, {"x": -3, "y": 78.05}, {"x": -2, "y": 78.47}, {"x": -1, "y": 78.83}, {"x": 0, "y": 79.4}, {"x": 1, "y": 82.97}]}, "2026-01": {"Reissue": [{"x": 1, "y": 82.89}, {"x": 2, "y": 83.33}, {"x": 3, "y": 83.7}, {"x": 4, "y": 83.98}, {"x": 5, "y": 84.35}, {"x": 6, "y": 84.63}, {"x": 7, "y": 84.86}, {"x": 8, "y": 84.99}, {"x": 9, "y": 85.21}, {"x": 10, "y": 85.42}, {"x": 11, "y": 85.6}, {"x": 12, "y": 85.73}, {"x": 13, "y": 85.85}, {"x": 14, "y": 85.99}, {"x": 15, "y": 86.08}, {"x": 16, "y": 86.19}, {"x": 17, "y": 86.27}, {"x": 18, "y": 86.39}, {"x": 19, "y": 86.53}, {"x": 20, "y": 86.67}, {"x": 21, "y": 86.78}, {"x": 22, "y": 86.86}, {"x": 23, "y": 86.94}, {"x": 24, "y": 87.06}, {"x": 25, "y": 87.17}, {"x": 26, "y": 87.27}, {"x": 27, "y": 87.56}, {"x": 28, "y": 87.63}, {"x": 29, "y": 92.13}], "Renovación": [{"x": -117, "y": 0.0}, {"x": -111, "y": 0.0}, {"x": -108, "y": 0.04}, {"x": -107, "y": 0.07}, {"x": -106, "y": 0.09}, {"x": -105, "y": 0.1}, {"x": -104, "y": 0.11}, {"x": -103, "y": 0.14}, {"x": -102, "y": 0.15}, {"x": -101, "y": 0.16}, {"x": -100, "y": 0.17}, {"x": -99, "y": 0.19}, {"x": -98, "y": 0.21}, {"x": -97, "y": 0.22}, {"x": -96, "y": 0.25}, {"x": -95, "y": 0.27}, {"x": -94, "y": 0.27}, {"x": -93, "y": 0.29}, {"x": -92, "y": 0.32}, {"x": -91, "y": 17.06}, {"x": -90, "y": 19.3}, {"x": -89, "y": 20.42}, {"x": -88, "y": 20.82}, {"x": -87, "y": 21.08}, {"x": -86, "y": 21.29}, {"x": -85, "y": 21.44}, {"x": -84, "y": 21.51}, {"x": -83, "y": 21.53}, {"x": -82, "y": 21.56}, {"x": -81, "y": 21.58}, {"x": -80, "y": 21.59}, {"x": -79, "y": 21.6}, {"x": -78, "y": 21.6}, {"x": -77, "y": 21.65}, {"x": -76, "y": 21.67}, {"x": -75, "y": 21.69}, {"x": -74, "y": 21.86}, {"x": -73, "y": 22.14}, {"x": -72, "y": 22.37}, {"x": -71, "y": 22.58}, {"x": -70, "y": 22.76}, {"x": -69, "y": 22.91}, {"x": -68, "y": 23.17}, {"x": -67, "y": 23.39}, {"x": -66, "y": 23.56}, {"x": -65, "y": 23.74}, {"x": -64, "y": 23.92}, {"x": -63, "y": 24.08}, {"x": -62, "y": 24.23}, {"x": -61, "y": 32.52}, {"x": -60, "y": 35.08}, {"x": -59, "y": 35.56}, {"x": -58, "y": 35.8}, {"x": -57, "y": 36.0}, {"x": -56, "y": 36.11}, {"x": -55, "y": 36.19}, {"x": -54, "y": 36.31}, {"x": -53, "y": 36.36}, {"x": -52, "y": 36.39}, {"x": -51, "y": 36.43}, {"x": -50, "y": 36.46}, {"x": -49, "y": 36.49}, {"x": -48, "y": 36.5}, {"x": -47, "y": 36.58}, {"x": -46, "y": 36.63}, {"x": -45, "y": 36.66}, {"x": -44, "y": 36.7}, {"x": -43, "y": 36.75}, {"x": -42, "y": 36.78}, {"x": -41, "y": 36.81}, {"x": -40, "y": 36.84}, {"x": -39, "y": 36.87}, {"x": -38, "y": 36.91}, {"x": -37, "y": 36.96}, {"x": -36, "y": 37.0}, {"x": -35, "y": 37.04}, {"x": -34, "y": 37.06}, {"x": -33, "y": 37.11}, {"x": -32, "y": 37.17}, {"x": -31, "y": 37.22}, {"x": -30, "y": 40.09}, {"x": -29, "y": 42.94}, {"x": -28, "y": 43.38}, {"x": -27, "y": 43.66}, {"x": -26, "y": 45.05}, {"x": -25, "y": 50.13}, {"x": -24, "y": 53.26}, {"x": -23, "y": 55.36}, {"x": -22, "y": 56.85}, {"x": -21, "y": 58.28}, {"x": -20, "y": 60.31}, {"x": -19, "y": 62.86}, {"x": -18, "y": 64.52}, {"x": -17, "y": 65.74}, {"x": -16, "y": 68.22}, {"x": -15, "y": 69.56}, {"x": -14, "y": 70.38}, {"x": -13, "y": 71.0}, {"x": -12, "y": 71.96}, {"x": -11, "y": 73.12}, {"x": -10, "y": 74.0}, {"x": -9, "y": 74.64}, {"x": -8, "y": 75.16}, {"x": -7, "y": 75.48}, {"x": -6, "y": 76.2}, {"x": -5, "y": 77.05}, {"x": -4, "y": 77.79}, {"x": -3, "y": 78.33}, {"x": -2, "y": 78.76}, {"x": -1, "y": 79.16}, {"x": 0, "y": 79.92}, {"x": 1, "y": 82.89}]}, "2026-02": {"Reissue": [{"x": 1, "y": 79.59}, {"x": 2, "y": 80.16}, {"x": 3, "y": 80.57}, {"x": 4, "y": 80.88}, {"x": 5, "y": 81.27}, {"x": 6, "y": 81.58}, {"x": 7, "y": 81.77}, {"x": 8, "y": 81.97}, {"x": 9, "y": 82.15}, {"x": 10, "y": 82.39}, {"x": 11, "y": 82.59}, {"x": 12, "y": 82.75}, {"x": 13, "y": 82.92}, {"x": 14, "y": 83.05}, {"x": 15, "y": 83.18}, {"x": 16, "y": 83.4}, {"x": 17, "y": 83.58}, {"x": 18, "y": 84.06}, {"x": 19, "y": 84.15}, {"x": 20, "y": 84.29}, {"x": 21, "y": 84.41}, {"x": 22, "y": 84.5}, {"x": 23, "y": 84.63}, {"x": 24, "y": 84.73}, {"x": 25, "y": 84.83}, {"x": 26, "y": 84.91}, {"x": 27, "y": 84.99}, {"x": 28, "y": 85.08}, {"x": 29, "y": 85.14}, {"x": 30, "y": 85.23}, {"x": 31, "y": 85.33}, {"x": 32, "y": 91.7}], "Renovación": [{"x": -105, "y": 0.03}, {"x": -104, "y": 0.03}, {"x": -103, "y": 0.04}, {"x": -102, "y": 0.07}, {"x": -101, "y": 0.09}, {"x": -100, "y": 0.1}, {"x": -99, "y": 0.1}, {"x": -98, "y": 0.11}, {"x": -97, "y": 0.12}, {"x": -96, "y": 0.13}, {"x": -95, "y": 0.14}, {"x": -94, "y": 0.14}, {"x": -93, "y": 0.15}, {"x": -92, "y": 0.18}, {"x": -91, "y": 0.19}, {"x": -90, "y": 0.21}, {"x": -89, "y": 20.15}, {"x": -88, "y": 22.06}, {"x": -87, "y": 22.72}, {"x": -86, "y": 23.04}, {"x": -85, "y": 23.34}, {"x": -84, "y": 23.48}, {"x": -83, "y": 23.6}, {"x": -82, "y": 23.69}, {"x": -81, "y": 23.73}, {"x": -80, "y": 23.77}, {"x": -79, "y": 23.82}, {"x": -78, "y": 23.85}, {"x": -77, "y": 23.88}, {"x": -76, "y": 23.91}, {"x": -75, "y": 23.94}, {"x": -74, "y": 24.01}, {"x": -73, "y": 24.08}, {"x": -72, "y": 24.14}, {"x": -71, "y": 24.18}, {"x": -70, "y": 24.23}, {"x": -69, "y": 24.25}, {"x": -68, "y": 24.3}, {"x": -67, "y": 24.33}, {"x": -66, "y": 24.35}, {"x": -65, "y": 24.37}, {"x": -64, "y": 24.43}, {"x": -63, "y": 24.46}, {"x": -62, "y": 24.51}, {"x": -61, "y": 24.55}, {"x": -60, "y": 24.59}, {"x": -59, "y": 24.62}, {"x": -58, "y": 31.2}, {"x": -57, "y": 33.25}, {"x": -56, "y": 33.68}, {"x": -55, "y": 34.01}, {"x": -54, "y": 34.4}, {"x": -53, "y": 34.61}, {"x": -52, "y": 34.76}, {"x": -51, "y": 34.95}, {"x": -50, "y": 35.05}, {"x": -49, "y": 35.14}, {"x": -48, "y": 35.18}, {"x": -47, "y": 35.26}, {"x": -46, "y": 35.36}, {"x": -45, "y": 35.43}, {"x": -44, "y": 35.52}, {"x": -43, "y": 35.59}, {"x": -42, "y": 35.65}, {"x": -41, "y": 35.73}, {"x": -40, "y": 35.8}, {"x": -39, "y": 35.89}, {"x": -38, "y": 35.99}, {"x": -37, "y": 36.08}, {"x": -36, "y": 36.18}, {"x": -35, "y": 36.23}, {"x": -34, "y": 36.28}, {"x": -33, "y": 36.35}, {"x": -32, "y": 36.45}, {"x": -31, "y": 36.53}, {"x": -30, "y": 36.61}, {"x": -29, "y": 36.71}, {"x": -28, "y": 36.79}, {"x": -27, "y": 40.48}, {"x": -26, "y": 45.24}, {"x": -25, "y": 49.91}, {"x": -24, "y": 52.7}, {"x": -23, "y": 54.78}, {"x": -22, "y": 56.51}, {"x": -21, "y": 57.79}, {"x": -20, "y": 59.55}, {"x": -19, "y": 61.77}, {"x": -18, "y": 63.37}, {"x": -17, "y": 64.66}, {"x": -16, "y": 65.58}, {"x": -15, "y": 66.53}, {"x": -14, "y": 67.1}, {"x": -13, "y": 68.49}, {"x": -12, "y": 69.02}, {"x": -11, "y": 69.54}, {"x": -10, "y": 70.12}, {"x": -9, "y": 70.64}, {"x": -8, "y": 71.6}, {"x": -7, "y": 71.98}, {"x": -6, "y": 72.32}, {"x": -5, "y": 73.03}, {"x": -4, "y": 73.55}, {"x": -3, "y": 74.72}, {"x": -2, "y": 75.15}, {"x": -1, "y": 75.46}, {"x": 0, "y": 76.5}, {"x": 1, "y": 79.59}]}, "2026-03": {"Reissue": [{"x": 1, "y": 80.97}, {"x": 2, "y": 81.59}, {"x": 3, "y": 81.94}, {"x": 4, "y": 82.24}, {"x": 5, "y": 82.51}, {"x": 6, "y": 82.84}, {"x": 7, "y": 83.13}, {"x": 8, "y": 83.45}, {"x": 9, "y": 83.62}, {"x": 10, "y": 83.77}, {"x": 11, "y": 83.9}, {"x": 12, "y": 84.0}, {"x": 13, "y": 84.17}, {"x": 14, "y": 84.35}, {"x": 15, "y": 84.48}, {"x": 16, "y": 84.62}, {"x": 17, "y": 84.77}, {"x": 18, "y": 84.93}, {"x": 19, "y": 85.04}, {"x": 20, "y": 85.19}, {"x": 21, "y": 85.32}, {"x": 22, "y": 85.46}, {"x": 23, "y": 85.56}, {"x": 24, "y": 85.68}, {"x": 25, "y": 85.79}, {"x": 26, "y": 85.9}, {"x": 27, "y": 86.0}, {"x": 28, "y": 86.08}, {"x": 29, "y": 86.19}, {"x": 30, "y": 86.26}, {"x": 31, "y": 91.4}], "Renovación": [{"x": -120, "y": 0.01}, {"x": -106, "y": 0.04}, {"x": -105, "y": 0.06}, {"x": -104, "y": 0.08}, {"x": -103, "y": 0.1}, {"x": -102, "y": 0.11}, {"x": -101, "y": 0.14}, {"x": -99, "y": 0.14}, {"x": -98, "y": 0.15}, {"x": -97, "y": 0.16}, {"x": -96, "y": 0.18}, {"x": -95, "y": 0.19}, {"x": -91, "y": 0.2}, {"x": -90, "y": 0.21}, {"x": -89, "y": 16.31}, {"x": -88, "y": 19.03}, {"x": -87, "y": 19.77}, {"x": -86, "y": 20.2}, {"x": -85, "y": 20.63}, {"x": -84, "y": 21.01}, {"x": -83, "y": 21.26}, {"x": -82, "y": 21.49}, {"x": -81, "y": 21.64}, {"x": -80, "y": 21.74}, {"x": -79, "y": 21.81}, {"x": -78, "y": 21.91}, {"x": -77, "y": 22.09}, {"x": -76, "y": 22.24}, {"x": -75, "y": 22.33}, {"x": -74, "y": 22.42}, {"x": -73, "y": 22.52}, {"x": -72, "y": 22.61}, {"x": -71, "y": 22.72}, {"x": -70, "y": 22.89}, {"x": -69, "y": 23.02}, {"x": -68, "y": 23.12}, {"x": -67, "y": 23.19}, {"x": -66, "y": 23.27}, {"x": -65, "y": 23.33}, {"x": -64, "y": 23.46}, {"x": -63, "y": 23.54}, {"x": -62, "y": 23.61}, {"x": -61, "y": 23.7}, {"x": -60, "y": 23.8}, {"x": -59, "y": 23.85}, {"x": -58, "y": 32.59}, {"x": -57, "y": 35.18}, {"x": -56, "y": 35.85}, {"x": -55, "y": 36.18}, {"x": -54, "y": 36.55}, {"x": -53, "y": 36.82}, {"x": -52, "y": 37.01}, {"x": -51, "y": 37.16}, {"x": -50, "y": 37.33}, {"x": -49, "y": 37.48}, {"x": -48, "y": 37.58}, {"x": -47, "y": 37.67}, {"x": -46, "y": 37.79}, {"x": -45, "y": 37.87}, {"x": -44, "y": 37.91}, {"x": -43, "y": 38.02}, {"x": -42, "y": 38.07}, {"x": -41, "y": 38.16}, {"x": -40, "y": 38.26}, {"x": -39, "y": 38.36}, {"x": -38, "y": 38.43}, {"x": -37, "y": 38.51}, {"x": -36, "y": 38.57}, {"x": -35, "y": 38.62}, {"x": -34, "y": 38.7}, {"x": -33, "y": 38.81}, {"x": -32, "y": 38.9}, {"x": -31, "y": 38.98}, {"x": -30, "y": 42.62}, {"x": -29, "y": 45.78}, {"x": -28, "y": 46.36}, {"x": -27, "y": 46.63}, {"x": -26, "y": 47.85}, {"x": -25, "y": 52.16}, {"x": -24, "y": 53.78}, {"x": -23, "y": 54.8}, {"x": -22, "y": 56.51}, {"x": -21, "y": 58.12}, {"x": -20, "y": 60.51}, {"x": -19, "y": 62.11}, {"x": -18, "y": 63.07}, {"x": -17, "y": 63.66}, {"x": -16, "y": 65.31}, {"x": -15, "y": 66.57}, {"x": -14, "y": 67.55}, {"x": -13, "y": 68.17}, {"x": -12, "y": 68.68}, {"x": -11, "y": 69.87}, {"x": -10, "y": 70.27}, {"x": -9, "y": 70.53}, {"x": -8, "y": 70.95}, {"x": -7, "y": 71.23}, {"x": -6, "y": 72.6}, {"x": -5, "y": 73.29}, {"x": -4, "y": 73.78}, {"x": -3, "y": 74.05}, {"x": -2, "y": 74.25}, {"x": -1, "y": 74.53}, {"x": 0, "y": 75.87}, {"x": 1, "y": 80.97}]}, "2026-04": {"Reissue": [{"x": 1, "y": 83.62}, {"x": 2, "y": 84.01}, {"x": 3, "y": 84.22}, {"x": 4, "y": 84.54}, {"x": 5, "y": 84.97}, {"x": 6, "y": 85.28}, {"x": 7, "y": 85.5}, {"x": 8, "y": 85.74}, {"x": 9, "y": 85.89}, {"x": 10, "y": 86.02}, {"x": 11, "y": 86.14}, {"x": 12, "y": 86.31}, {"x": 13, "y": 86.48}], "Renovación": [{"x": -105, "y": 0.02}, {"x": -102, "y": 0.03}, {"x": -101, "y": 0.03}, {"x": -100, "y": 0.04}, {"x": -99, "y": 0.04}, {"x": -97, "y": 0.05}, {"x": -96, "y": 0.05}, {"x": -95, "y": 0.06}, {"x": -94, "y": 0.06}, {"x": -93, "y": 0.06}, {"x": -92, "y": 0.07}, {"x": -91, "y": 0.08}, {"x": -90, "y": 0.09}, {"x": -89, "y": 0.1}, {"x": -88, "y": 20.31}, {"x": -87, "y": 23.57}, {"x": -86, "y": 24.65}, {"x": -85, "y": 25.25}, {"x": -84, "y": 25.67}, {"x": -83, "y": 26.06}, {"x": -82, "y": 26.35}, {"x": -81, "y": 26.54}, {"x": -80, "y": 26.73}, {"x": -79, "y": 26.88}, {"x": -78, "y": 27.04}, {"x": -77, "y": 27.19}, {"x": -76, "y": 27.31}, {"x": -75, "y": 27.4}, {"x": -74, "y": 27.46}, {"x": -73, "y": 27.56}, {"x": -72, "y": 27.68}, {"x": -71, "y": 27.77}, {"x": -70, "y": 27.91}, {"x": -69, "y": 27.98}, {"x": -68, "y": 28.08}, {"x": -67, "y": 28.16}, {"x": -66, "y": 28.25}, {"x": -65, "y": 28.34}, {"x": -64, "y": 28.43}, {"x": -63, "y": 28.51}, {"x": -62, "y": 28.58}, {"x": -61, "y": 28.64}, {"x": -60, "y": 36.63}, {"x": -59, "y": 39.1}, {"x": -58, "y": 39.67}, {"x": -57, "y": 40.0}, {"x": -56, "y": 40.33}, {"x": -55, "y": 40.72}, {"x": -54, "y": 40.95}, {"x": -53, "y": 41.23}, {"x": -52, "y": 41.44}, {"x": -51, "y": 41.66}, {"x": -50, "y": 41.73}, {"x": -49, "y": 41.8}, {"x": -48, "y": 41.89}, {"x": -47, "y": 41.96}, {"x": -46, "y": 42.03}, {"x": -45, "y": 42.09}, {"x": -44, "y": 42.2}, {"x": -43, "y": 42.28}, {"x": -42, "y": 42.37}, {"x": -41, "y": 42.44}, {"x": -40, "y": 42.46}, {"x": -39, "y": 42.5}, {"x": -38, "y": 42.57}, {"x": -37, "y": 42.65}, {"x": -36, "y": 42.72}, {"x": -35, "y": 42.77}, {"x": -34, "y": 42.84}, {"x": -33, "y": 42.9}, {"x": -32, "y": 42.95}, {"x": -31, "y": 42.98}, {"x": -30, "y": 43.04}, {"x": -29, "y": 45.65}, {"x": -28, "y": 48.59}, {"x": -27, "y": 48.94}, {"x": -26, "y": 49.71}, {"x": -25, "y": 51.73}, {"x": -24, "y": 54.22}, {"x": -23, "y": 56.15}, {"x": -22, "y": 57.33}, {"x": -21, "y": 58.51}, {"x": -20, "y": 60.42}, {"x": -19, "y": 61.54}, {"x": -18, "y": 62.19}, {"x": -17, "y": 63.19}, {"x": -16, "y": 63.97}, {"x": -15, "y": 66.41}, {"x": -14, "y": 67.31}, {"x": -13, "y": 68.04}, {"x": -12, "y": 68.48}, {"x": -11, "y": 68.84}, {"x": -10, "y": 69.84}, {"x": -9, "y": 70.28}, {"x": -8, "y": 70.71}, {"x": -7, "y": 71.1}, {"x": -6, "y": 71.55}, {"x": -5, "y": 73.03}, {"x": -4, "y": 73.47}, {"x": -3, "y": 74.02}, {"x": -2, "y": 74.44}, {"x": -1, "y": 74.85}, {"x": 0, "y": 76.1}, {"x": 1, "y": 83.62}]}, "2026-05": {"Renovación": [{"x": -120, "y": 0.0}, {"x": -119, "y": 0.01}, {"x": -91, "y": 14.8}, {"x": -90, "y": 21.22}, {"x": -89, "y": 22.47}, {"x": -88, "y": 23.03}, {"x": -87, "y": 23.51}, {"x": -86, "y": 24.0}, {"x": -85, "y": 24.37}, {"x": -84, "y": 24.68}, {"x": -83, "y": 25.02}, {"x": -82, "y": 25.33}, {"x": -81, "y": 25.48}, {"x": -80, "y": 25.62}, {"x": -79, "y": 25.76}, {"x": -78, "y": 25.85}, {"x": -77, "y": 25.97}, {"x": -76, "y": 26.08}, {"x": -75, "y": 26.19}, {"x": -74, "y": 26.31}, {"x": -73, "y": 26.42}, {"x": -72, "y": 26.5}, {"x": -71, "y": 26.56}, {"x": -70, "y": 26.61}, {"x": -69, "y": 26.69}, {"x": -68, "y": 26.73}, {"x": -67, "y": 26.81}, {"x": -66, "y": 26.88}, {"x": -65, "y": 26.93}, {"x": -64, "y": 26.99}, {"x": -63, "y": 27.03}, {"x": -62, "y": 27.09}, {"x": -61, "y": 27.16}, {"x": -60, "y": 34.21}, {"x": -59, "y": 36.03}, {"x": -58, "y": 36.44}, {"x": -57, "y": 36.75}, {"x": -56, "y": 36.93}, {"x": -55, "y": 37.21}, {"x": -54, "y": 37.45}, {"x": -53, "y": 37.62}, {"x": -52, "y": 37.73}, {"x": -51, "y": 37.81}, {"x": -50, "y": 37.89}, {"x": -49, "y": 37.94}, {"x": -48, "y": 38.03}, {"x": -47, "y": 38.11}, {"x": -46, "y": 38.21}, {"x": -45, "y": 38.39}, {"x": -44, "y": 38.59}, {"x": -43, "y": 38.75}, {"x": -42, "y": 38.9}, {"x": -41, "y": 39.13}, {"x": -40, "y": 39.27}, {"x": -39, "y": 39.46}, {"x": -38, "y": 39.68}, {"x": -37, "y": 39.84}, {"x": -36, "y": 39.97}, {"x": -35, "y": 40.09}, {"x": -34, "y": 40.28}, {"x": -33, "y": 40.45}, {"x": -32, "y": 40.59}, {"x": -31, "y": 40.82}, {"x": -30, "y": 43.53}, {"x": -29, "y": 46.57}, {"x": -28, "y": 47.05}, {"x": -27, "y": 47.65}, {"x": -26, "y": 48.87}, {"x": -25, "y": 52.73}, {"x": -24, "y": 54.92}, {"x": -23, "y": 56.7}, {"x": -22, "y": 57.71}, {"x": -21, "y": 58.57}, {"x": -20, "y": 61.27}, {"x": -19, "y": 62.98}, {"x": -18, "y": 64.17}, {"x": -17, "y": 64.18}]}, "2026-06": {"Renovación": [{"x": -90, "y": 19.15}, {"x": -89, "y": 21.59}, {"x": -88, "y": 22.36}, {"x": -87, "y": 22.78}, {"x": -86, "y": 23.1}, {"x": -85, "y": 23.59}, {"x": -84, "y": 23.98}, {"x": -83, "y": 24.23}, {"x": -82, "y": 24.36}, {"x": -81, "y": 24.46}, {"x": -80, "y": 24.56}, {"x": -79, "y": 24.63}, {"x": -78, "y": 24.75}, {"x": -77, "y": 24.85}, {"x": -76, "y": 24.99}, {"x": -75, "y": 25.23}, {"x": -74, "y": 25.43}, {"x": -73, "y": 25.67}, {"x": -72, "y": 25.86}, {"x": -71, "y": 26.09}, {"x": -70, "y": 26.32}, {"x": -69, "y": 26.58}, {"x": -68, "y": 26.84}, {"x": -67, "y": 27.07}, {"x": -66, "y": 27.25}, {"x": -65, "y": 27.44}, {"x": -64, "y": 27.66}, {"x": -63, "y": 27.89}, {"x": -62, "y": 28.08}, {"x": -61, "y": 28.34}, {"x": -60, "y": 35.94}, {"x": -59, "y": 38.38}, {"x": -58, "y": 39.06}, {"x": -57, "y": 39.74}, {"x": -56, "y": 40.23}, {"x": -55, "y": 40.6}, {"x": -54, "y": 41.01}, {"x": -53, "y": 41.3}, {"x": -52, "y": 41.5}, {"x": -51, "y": 41.64}, {"x": -50, "y": 41.87}, {"x": -49, "y": 42.1}, {"x": -48, "y": 42.31}, {"x": -47, "y": 42.31}]}, "2026-07": {"Renovación": [{"x": -101, "y": 0.01}, {"x": -96, "y": 0.01}, {"x": -88, "y": 22.34}, {"x": -87, "y": 25.18}, {"x": -86, "y": 26.29}, {"x": -85, "y": 27.1}, {"x": -84, "y": 27.73}, {"x": -83, "y": 28.13}, {"x": -82, "y": 28.45}, {"x": -81, "y": 28.89}, {"x": -80, "y": 29.18}, {"x": -79, "y": 29.49}, {"x": -78, "y": 29.49}]}};

// ── PESOS E CICLOS ─────────────────────────────────────────────
const PRODS  = ['HIBRIDO', 'PURO DEBITO'];
const CICLOS = ['0-30d','31-60d','61-90d','91-120d','121-180d','+181d'];
const P_W    = {HIBRIDO: 0.65, 'PURO DEBITO': 0.35};
const C_REN  = {'0-30d':0.28, '31-60d':0.05, '61-90d':0.04, '91-120d':0.03, '121-180d':0.04, '+181d':0.43, 'Inativo':0.13};
const C_REI  = {'0-30d':0.06, '31-60d':0.12, '61-90d':0.20, '91-120d':0.24, '121-180d':0.24, '+181d':0.14};

// ── HELPER ────────────────────────────────────────────────────────
function safraLabel(s) {
  const mm = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  return mm[parseInt(s.slice(4,6))-1] + '/' + s.slice(2,4);
}

// ── RAW_DATA — todas as combinações (mes × produto × ciclo) ──
const RAW_DATA = [];
{
  const C_REN_KEYS = ['0-30d','31-60d','61-90d','91-120d','121-180d','+181d','Inativo'];
  MONTHLY.forEach(m => {
    PRODS.forEach(prod => {
      const pW = P_W[prod];
      CICLOS.forEach(ciclo => {
        RAW_DATA.push({
          mes:m.mes, prod, ciclo,
          ren:Math.round(m.ren*pW*C_REN[ciclo]),
          rei:Math.round(m.rei*pW*C_REI[ciclo]||0),
          tel:Math.round(m.tel*pW/CICLOS.length),
          ent:Math.round(m.ent*pW/CICLOS.length),
          dm:m.dm, completo:m.completo
        });
      });
    });
  });
}