// ═══════════════════════════════════════════════════════════════
//  dashboard_data.js — gerado automaticamente por update_data.py
//  Última atualização: 27/04/2026
//  Fonte: meli-bi-data.SBOX_CREDITSTC.CARTAO_EXPIRADO_ANL_IA
//         meli-bi-data.SBOX_CREDITSTC.CARTAO_EXPIRADO_CUBO_IA
// ═══════════════════════════════════════════════════════════════

// ── DATA DA ÚLTIMA ATUALIZAÇÃO ────────────────────────────────
const DT_ATUALIZACAO = '27/04/2026';

// ── TOTAIS MENSAIS REAIS (BigQuery) ───────────────────────────
const MONTHLY = [
  {mes:'Abr/25', completo:true, ren:14, rei:1, ent:13, dm:5.64, tel:19},
  {mes:'Mai/25', completo:true, ren:1075, rei:67, ent:1019, dm:8.53, tel:1354},
  {mes:'Jun/25', completo:true, ren:15969, rei:999, ent:15300, dm:8.51, tel:20138},
  {mes:'Jul/25', completo:true, ren:29501, rei:1577, ent:28040, dm:9.82, tel:37720},
  {mes:'Ago/25', completo:true, ren:29403, rei:1800, ent:27717, dm:7.0, tel:39653},
  {mes:'Set/25', completo:true, ren:35274, rei:2240, ent:33384, dm:6.02, tel:48296},
  {mes:'Out/25', completo:true, ren:30830, rei:1755, ent:29731, dm:4.72, tel:43204},
  {mes:'Nov/25', completo:true, ren:46255, rei:2674, ent:44793, dm:4.69, tel:65530},
  {mes:'Dez/25', completo:true, ren:54975, rei:4061, ent:53421, dm:5.29, tel:77699},
  {mes:'Jan/26', completo:true, ren:27374, rei:2076, ent:26774, dm:4.77, tel:38175},
  {mes:'Fev/26', completo:true, ren:14120, rei:1467, ent:13790, dm:4.66, tel:20975},
  {mes:'Mar/26', completo:true, ren:10370, rei:1031, ent:10121, dm:4.49, tel:15821},
  {mes:'Abr/26*', completo:false, ren:13139, rei:0, ent:10861, dm:3.78, tel:22300},
];

// ── SUMÁRIO EXECUTIVO ─────────────────────────────────────────
const SUMARIO_TOTAL = {
  qtde_total:701097,
  qtde_renovados:316199,
  qtde_reemitidos:19748,
  qtde_total_renov:335947,
  qtde_entregue:300483,
  qtde_desbloqueado:232458,
};
const SUMARIO_CICLO = [{"ciclo": "01. 1 A 30 D", "qtde_total": 327819, "qtde_renovados": 132321, "qtde_reemitidos": 12328, "qtde_total_renov": 144649, "qtde_entregue": 126514, "qtde_desbloqueado": 118124}, {"ciclo": "02. 31 A 60 D", "qtde_total": 48464, "qtde_renovados": 22882, "qtde_reemitidos": 1503, "qtde_total_renov": 24385, "qtde_entregue": 21875, "qtde_desbloqueado": 19708}, {"ciclo": "03. 61 A 90 D", "qtde_total": 30414, "qtde_renovados": 14844, "qtde_reemitidos": 858, "qtde_total_renov": 15702, "qtde_entregue": 14180, "qtde_desbloqueado": 12301}, {"ciclo": "04. 91 A 120 D", "qtde_total": 23402, "qtde_renovados": 12694, "qtde_reemitidos": 739, "qtde_total_renov": 13433, "qtde_entregue": 12052, "qtde_desbloqueado": 9810}, {"ciclo": "05. 121 A 180 D", "qtde_total": 40329, "qtde_renovados": 22991, "qtde_reemitidos": 1086, "qtde_total_renov": 24077, "qtde_entregue": 21761, "qtde_desbloqueado": 15797}, {"ciclo": "06. ACIMA DE 180 D", "qtde_total": 230669, "qtde_renovados": 110467, "qtde_reemitidos": 3234, "qtde_total_renov": 113701, "qtde_entregue": 104101, "qtde_desbloqueado": 56718}];

// ── FUNIL DE ATIVAÇÃO PÓS-RENOVAÇÃO ──────────────────────────
const FUNIL_DATA = [
  {safra:'202504', base:15, entregue:13, ativados:13, ativos_tc:4, ativos_td:13, ativos_fisico:13, ativos_ambos:0, tpv_tc:3256.07, tpv_td:103932.48, tpn_tc:0, tpn_td:0, maps_tc:4, maps_td:13},
  {safra:'202505', base:1142, entregue:1019, ativados:923, ativos_tc:492, ativos_td:583, ativos_fisico:789, ativos_ambos:0, tpv_tc:844463.31, tpv_td:1128877.83, tpn_tc:0, tpn_td:0, maps_tc:492, maps_td:583},
  {safra:'202506', base:16968, entregue:15300, ativados:13882, ativos_tc:7909, ativos_td:8693, ativos_fisico:11890, ativos_ambos:0, tpv_tc:15512118.12, tpv_td:16299444.13, tpn_tc:0, tpn_td:0, maps_tc:7909, maps_td:8693},
  {safra:'202507', base:31078, entregue:28040, ativados:23972, ativos_tc:13385, ativos_td:15079, ativos_fisico:20604, ativos_ambos:0, tpv_tc:27855446.44, tpv_td:28117987.86, tpn_tc:0, tpn_td:0, maps_tc:13385, maps_td:15079},
  {safra:'202508', base:31203, entregue:27717, ativados:22927, ativos_tc:12711, ativos_td:14805, ativos_fisico:19986, ativos_ambos:0, tpv_tc:26102447.43, tpv_td:27988183.01, tpn_tc:0, tpn_td:0, maps_tc:12711, maps_td:14805},
  {safra:'202509', base:37514, entregue:33384, ativados:27197, ativos_tc:14944, ativos_td:17906, ativos_fisico:23968, ativos_ambos:0, tpv_tc:30987520.96, tpv_td:32653476.73, tpn_tc:0, tpn_td:0, maps_tc:14944, maps_td:17906},
  {safra:'202510', base:32585, entregue:29731, ativados:23570, ativos_tc:12980, ativos_td:15558, ativos_fisico:20881, ativos_ambos:0, tpv_tc:27982414.24, tpv_td:31492732.08, tpn_tc:0, tpn_td:0, maps_tc:12980, maps_td:15558},
  {safra:'202511', base:48929, entregue:44793, ativados:34874, ativos_tc:19655, ativos_td:22969, ativos_fisico:31114, ativos_ambos:0, tpv_tc:39223624.22, tpv_td:40749948.13, tpn_tc:0, tpn_td:0, maps_tc:19655, maps_td:22969},
  {safra:'202512', base:59036, entregue:53421, ativados:41110, ativos_tc:23429, ativos_td:26933, ativos_fisico:36801, ativos_ambos:0, tpv_tc:47623862.07, tpv_td:46329358.02, tpn_tc:0, tpn_td:0, maps_tc:23429, maps_td:26933},
  {safra:'202601', base:29450, entregue:26774, ativados:20078, ativos_tc:11506, ativos_td:13351, ativos_fisico:18105, ativos_ambos:0, tpv_tc:23747460.41, tpv_td:22627853.19, tpn_tc:0, tpn_td:0, maps_tc:11506, maps_td:13351},
  {safra:'202602', base:15587, entregue:13790, ativados:10273, ativos_tc:6171, ativos_td:5983, ativos_fisico:8968, ativos_ambos:0, tpv_tc:12851508.73, tpv_td:8885487.85, tpn_tc:0, tpn_td:0, maps_tc:6171, maps_td:5983},
  {safra:'202603', base:11401, entregue:10121, ativados:7458, ativos_tc:4018, ativos_td:3796, ativos_fisico:5990, ativos_ambos:0, tpv_tc:6015417.08, tpv_td:3907836.03, tpn_tc:0, tpn_td:0, maps_tc:4018, maps_td:3796},
  {safra:'202604', base:13139, entregue:10861, ativados:6143, ativos_tc:3821, ativos_td:3840, ativos_fisico:6141, ativos_ambos:0, tpv_tc:4205517.12, tpv_td:2669551.11, tpn_tc:0, tpn_td:0, maps_tc:3821, maps_td:3840},
];

// ── SPENDING ANTES DA RENOVAÇÃO ───────────────────────────────
const SPENDING_ANTES = [
  {safra:'202504', tpv_tc_antes:7238.28, tpv_td_antes:139590.89, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202505', tpv_tc_antes:932059.83, tpv_td_antes:1349661.19, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202506', tpv_tc_antes:15523787.47, tpv_td_antes:19603234.49, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202507', tpv_tc_antes:28870073.02, tpv_td_antes:34845084.55, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202508', tpv_tc_antes:28230210.63, tpv_td_antes:35627066.84, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202509', tpv_tc_antes:33969640.13, tpv_td_antes:41532757.44, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202510', tpv_tc_antes:29830934.11, tpv_td_antes:39238577.01, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202511', tpv_tc_antes:44394669.13, tpv_td_antes:53435781.59, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202512', tpv_tc_antes:56967074.86, tpv_td_antes:60449175.32, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202601', tpv_tc_antes:29432347.99, tpv_td_antes:32353048.57, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202602', tpv_tc_antes:17485707.82, tpv_td_antes:15489585.01, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202603', tpv_tc_antes:12708437.81, tpv_td_antes:10304208.35, tpn_tc_antes:0, tpn_td_antes:0},
  {safra:'202604', tpv_tc_antes:16498365.6, tpv_td_antes:13602184.07, tpn_tc_antes:0, tpn_td_antes:0},
];

// ── CICLO DE USO POR SAFRA ─────────────────────────────────────
const CICLO_SAFRA = [
  {safra:'202504', c1:12, c2:0, c3:0, c4:0, c5:0, c6:3, c7:0},
  {safra:'202505', c1:456, c2:73, c3:51, c4:50, c5:67, c6:445, c7:0},
  {safra:'202506', c1:7412, c2:1234, c3:764, c4:643, c5:973, c6:5942, c7:0},
  {safra:'202507', c1:13035, c2:2165, c3:1363, c4:1002, c5:1703, c6:11810, c7:0},
  {safra:'202508', c1:12809, c2:2059, c3:1236, c4:1055, c5:1756, c6:12288, c7:0},
  {safra:'202509', c1:15512, c2:2580, c3:1534, c4:1214, c5:1982, c6:14692, c7:0},
  {safra:'202510', c1:13958, c2:2213, c3:1315, c4:1016, c5:2185, c6:11898, c7:0},
  {safra:'202511', c1:20975, c2:3374, c3:2061, c4:1651, c5:4984, c6:15884, c7:0},
  {safra:'202512', c1:25762, c2:4171, c3:2621, c4:2843, c5:5787, c6:17852, c7:0},
  {safra:'202601', c1:13122, c2:2060, c3:1754, c4:2129, c5:1985, c6:8400, c7:0},
  {safra:'202602', c1:7044, c2:1315, c3:1372, c4:627, c5:888, c6:4341, c7:0},
  {safra:'202603', c1:5140, c2:1372, c3:561, c4:432, c5:586, c6:3310, c7:0},
  {safra:'202604', c1:6125, c2:1018, c3:630, c4:449, c5:739, c6:4178, c7:0},
  {safra:'202605', c1:1487, c2:348, c3:228, c4:147, c5:216, c6:1336, c7:0},
  {safra:'202606', c1:1785, c2:403, c3:211, c4:172, c5:224, c6:1313, c7:0},
  {safra:'202607', c1:0, c2:0, c3:0, c4:0, c5:0, c6:0, c7:0},
  {safra:'202608', c1:0, c2:0, c3:0, c4:0, c5:0, c6:0, c7:0},
  {safra:'202609', c1:0, c2:0, c3:0, c4:2, c5:0, c6:1, c7:0},
  {safra:'202610', c1:12, c2:0, c3:1, c4:1, c5:2, c6:6, c7:0},
  {safra:'202611', c1:1, c2:0, c3:0, c4:0, c5:0, c6:0, c7:0},
  {safra:'202612', c1:2, c2:0, c3:0, c4:0, c5:0, c6:2, c7:0},
];

// ── DISTRIBUIÇÃO DIAS_ENTREGA POR FAIXA/MÊS ──────────────────
const DIAS_ENTREGA_DIST = {};

// ── DISTRIBUIÇÃO DIAS_ENTREGA V2 (dias inteiros do tracking) ──
const DIAS_ENTREGA_V2 = {"202504": {"2": 2, "4": 2, "5": 2, "6": 1, "7": 5, "8": 2}, "202505": {"2": 14, "3": 83, "4": 84, "5": 186, "6": 169, "7": 137, "8": 91, "9": 55, "10": 33, "11": 32, "12": 19, "13": 15, "14": 17, "15": 16, "16": 9, "17": 10, "18": 11, "19": 9, "20": 6, "21": 7, "22": 8, "23": 2, "24": 7, "25": 2, "26": 3, "27": 5, "28": 3, "29": 6, "32": 2, "33": 1, "34": 2, "36": 5, "37": 1, "39": 1, "41": 1, "42": 3, "51": 1, "52": 1, "62": 1, "70": 1, "71": 1}, "202506": {"1": 4, "2": 486, "3": 1542, "4": 2204, "5": 2160, "6": 1664, "7": 1242, "8": 1448, "9": 1050, "10": 796, "11": 527, "12": 383, "13": 216, "14": 192, "15": 259, "16": 210, "17": 208, "18": 140, "19": 155, "20": 92, "21": 99, "22": 117, "23": 71, "24": 82, "25": 80, "26": 66, "27": 38, "28": 36, "29": 52, "30": 39, "31": 47, "32": 26, "33": 35, "34": 12, "35": 11, "36": 24, "37": 13, "38": 20, "39": 6, "40": 12, "41": 8, "42": 7, "43": 10, "44": 6, "45": 7, "46": 12, "47": 4, "48": 5, "50": 4, "51": 5, "52": 3, "53": 3, "54": 2, "55": 2, "56": 1, "57": 3, "58": 2, "59": 2, "60": 1, "61": 2, "62": 1, "63": 2, "64": 4, "68": 2, "70": 1, "71": 1, "81": 1, "82": 1, "166": 1, "169": 1, "174": 1, "189": 1, "292": 1}, "202507": {"1": 6, "2": 876, "3": 2224, "4": 2832, "5": 2126, "6": 2610, "7": 2395, "8": 2662, "9": 1934, "10": 1523, "11": 1332, "12": 1286, "13": 1277, "14": 957, "15": 821, "16": 652, "17": 524, "18": 320, "19": 264, "20": 273, "21": 264, "22": 201, "23": 157, "24": 140, "25": 78, "26": 88, "27": 141, "28": 138, "29": 91, "30": 94, "31": 70, "32": 47, "33": 58, "34": 62, "35": 56, "36": 48, "37": 41, "38": 24, "39": 22, "40": 25, "41": 22, "42": 18, "43": 30, "44": 12, "45": 8, "46": 7, "47": 5, "48": 10, "49": 11, "50": 11, "51": 5, "52": 6, "53": 1, "54": 3, "55": 6, "56": 3, "57": 5, "58": 4, "59": 1, "62": 1, "63": 3, "64": 4, "65": 2, "67": 1, "68": 1, "71": 2, "72": 1, "75": 1, "76": 1, "77": 1, "78": 1, "79": 1, "80": 1, "84": 1, "88": 1, "94": 1, "95": 1, "97": 1, "102": 1, "105": 1, "111": 1, "143": 1, "145": 1, "192": 1, "199": 1, "201": 1, "207": 1, "283": 1}, "202508": {"1": 116, "2": 3674, "3": 3965, "4": 4118, "5": 4078, "6": 3045, "7": 2193, "8": 1449, "9": 946, "10": 691, "11": 515, "12": 474, "13": 455, "14": 364, "15": 280, "16": 301, "17": 243, "18": 217, "19": 189, "20": 172, "21": 175, "22": 110, "23": 100, "24": 88, "25": 70, "26": 69, "27": 81, "28": 54, "29": 63, "30": 49, "31": 34, "32": 31, "33": 28, "34": 31, "35": 31, "36": 29, "37": 23, "38": 20, "39": 9, "40": 10, "41": 18, "42": 9, "43": 9, "44": 10, "45": 3, "46": 1, "47": 3, "48": 7, "49": 10, "50": 6, "51": 5, "52": 4, "53": 3, "54": 2, "55": 1, "57": 3, "58": 2, "59": 3, "60": 2, "61": 2, "64": 4, "66": 2, "68": 1, "70": 2, "71": 1, "75": 2, "76": 1, "77": 2, "80": 1, "84": 1, "86": 2, "91": 1, "96": 1, "101": 1, "110": 1, "125": 1, "135": 1, "158": 1, "181": 1, "187": 9, "189": 2, "196": 1, "211": 1, "214": 1, "289": 1}, "202509": {"1": 635, "2": 5675, "3": 5982, "4": 5231, "5": 4730, "6": 3270, "7": 2395, "8": 1382, "9": 889, "10": 573, "11": 499, "12": 409, "13": 338, "14": 380, "15": 227, "16": 254, "17": 229, "18": 185, "19": 169, "20": 136, "21": 144, "22": 104, "23": 69, "24": 76, "25": 71, "26": 50, "27": 46, "28": 53, "29": 43, "30": 37, "31": 38, "32": 28, "33": 32, "34": 26, "35": 28, "36": 15, "37": 17, "38": 14, "39": 7, "40": 12, "41": 7, "42": 7, "43": 7, "44": 8, "45": 6, "46": 7, "47": 4, "48": 7, "49": 6, "50": 5, "51": 3, "52": 2, "53": 4, "54": 3, "55": 4, "56": 4, "57": 1, "58": 1, "59": 4, "60": 1, "61": 4, "62": 3, "63": 3, "64": 3, "65": 3, "66": 5, "67": 1, "68": 1, "69": 1, "76": 3, "78": 1, "80": 1, "81": 1, "83": 1, "84": 1, "85": 1, "86": 1, "91": 2, "92": 1, "94": 3, "97": 3, "98": 1, "100": 2, "101": 1, "109": 1, "119": 1, "121": 1, "125": 1, "126": 1, "128": 1, "131": 1, "146": 1, "148": 1, "158": 1, "202": 1, "213": 1, "289": 1}, "202510": {"1": 1623, "2": 6379, "3": 5995, "4": 4709, "5": 4221, "6": 2622, "7": 1806, "8": 893, "9": 481, "10": 285, "11": 206, "12": 165, "13": 146, "14": 168, "15": 113, "16": 108, "17": 80, "18": 69, "19": 56, "20": 63, "21": 41, "22": 45, "23": 48, "24": 32, "25": 22, "26": 27, "27": 25, "28": 27, "29": 19, "30": 23, "31": 12, "32": 18, "33": 12, "34": 13, "35": 15, "36": 6, "37": 9, "38": 6, "39": 5, "40": 13, "41": 2, "42": 4, "43": 6, "44": 1, "45": 3, "46": 3, "47": 1, "49": 1, "51": 2, "52": 2, "53": 1, "54": 2, "55": 3, "57": 1, "60": 1, "63": 2, "65": 2, "67": 1, "71": 1, "76": 1, "80": 1, "89": 1, "92": 1, "100": 1, "109": 1, "114": 1, "131": 1, "149": 1, "198": 1}, "202511": {"1": 1776, "2": 8655, "3": 9507, "4": 7685, "5": 6509, "6": 5328, "7": 3074, "8": 1244, "9": 546, "10": 311, "11": 131, "12": 138, "13": 140, "14": 125, "15": 85, "16": 111, "17": 61, "18": 52, "19": 56, "20": 73, "21": 55, "22": 54, "23": 44, "24": 24, "25": 24, "26": 41, "27": 35, "28": 32, "29": 25, "30": 26, "31": 20, "32": 11, "33": 24, "34": 17, "35": 18, "36": 13, "37": 7, "38": 7, "39": 6, "40": 12, "41": 14, "42": 10, "43": 6, "44": 5, "45": 3, "46": 5, "47": 5, "48": 1, "49": 7, "50": 5, "51": 3, "52": 2, "53": 2, "54": 4, "55": 2, "57": 3, "58": 4, "59": 2, "60": 4, "61": 2, "62": 3, "63": 5, "64": 3, "66": 2, "67": 1, "69": 3, "70": 1, "71": 1, "72": 1, "73": 2, "74": 1, "76": 2, "77": 1, "78": 1, "79": 1, "81": 1, "82": 1, "84": 3, "85": 1, "86": 2, "87": 2, "88": 3, "91": 1, "92": 1, "95": 1, "98": 1, "102": 1, "105": 1, "117": 1, "122": 2, "126": 2, "128": 1, "130": 1, "142": 1, "163": 1, "225": 1}, "202512": {"1": 1762, "2": 7421, "3": 10020, "4": 9691, "5": 8898, "6": 7109, "7": 4760, "8": 2191, "9": 1053, "10": 695, "11": 479, "12": 346, "13": 269, "14": 159, "15": 109, "16": 105, "17": 75, "18": 77, "19": 60, "20": 54, "21": 70, "22": 56, "23": 49, "24": 40, "25": 54, "26": 47, "27": 58, "28": 58, "29": 49, "30": 36, "31": 34, "32": 37, "33": 23, "34": 26, "35": 28, "36": 17, "37": 23, "38": 26, "39": 18, "40": 22, "41": 16, "42": 13, "43": 14, "44": 10, "45": 14, "46": 9, "47": 9, "48": 7, "49": 5, "50": 8, "51": 5, "52": 6, "53": 11, "54": 5, "55": 1, "56": 5, "57": 6, "58": 3, "59": 5, "60": 1, "61": 3, "62": 2, "63": 2, "64": 4, "65": 5, "66": 2, "68": 3, "69": 2, "70": 1, "72": 2, "73": 2, "74": 4, "75": 3, "76": 2, "78": 2, "79": 3, "80": 8, "83": 2, "84": 1, "85": 1, "86": 2, "89": 1, "90": 1, "91": 1, "92": 1, "93": 1, "94": 2, "95": 1, "96": 2, "103": 2, "107": 1, "109": 1, "110": 2, "112": 1, "119": 2, "121": 2, "127": 1, "129": 2, "130": 1, "197": 3}, "202601": {"1": 1430, "2": 4804, "3": 5398, "4": 4630, "5": 4464, "6": 3399, "7": 1763, "8": 922, "9": 394, "10": 205, "11": 149, "12": 92, "13": 46, "14": 38, "15": 33, "16": 24, "17": 26, "18": 27, "19": 21, "20": 25, "21": 36, "22": 19, "23": 17, "24": 23, "25": 19, "26": 16, "27": 18, "28": 18, "29": 12, "30": 11, "31": 6, "32": 5, "33": 14, "34": 12, "35": 10, "36": 4, "37": 13, "38": 13, "39": 6, "40": 5, "41": 3, "42": 8, "43": 5, "44": 8, "45": 7, "46": 3, "47": 3, "48": 8, "49": 4, "50": 3, "51": 4, "52": 2, "53": 3, "54": 1, "56": 1, "57": 1, "58": 1, "60": 1, "61": 1, "62": 1, "63": 2, "65": 4, "67": 2, "68": 2, "69": 1, "70": 1, "72": 3, "73": 2, "74": 2, "75": 2, "76": 1, "79": 3, "80": 10, "82": 1, "85": 1, "89": 1, "92": 1, "93": 2, "95": 1, "96": 2, "97": 1, "101": 1, "104": 1, "106": 1, "144": 1}, "202602": {"1": 690, "2": 2515, "3": 3202, "4": 2315, "5": 2352, "6": 1786, "7": 928, "8": 448, "9": 200, "10": 72, "11": 49, "12": 35, "13": 29, "14": 15, "15": 14, "16": 15, "17": 16, "18": 19, "19": 12, "20": 9, "21": 14, "22": 12, "23": 10, "24": 9, "25": 11, "26": 7, "27": 4, "28": 13, "29": 8, "30": 8, "31": 8, "32": 7, "33": 2, "34": 4, "35": 3, "36": 1, "37": 8, "38": 5, "39": 4, "40": 5, "42": 7, "44": 4, "45": 1, "47": 2, "48": 1, "49": 1, "51": 1, "52": 1, "56": 1, "57": 3, "58": 2, "60": 3, "61": 3, "63": 2, "64": 1, "67": 1, "68": 2, "70": 1, "71": 1, "73": 1, "74": 1, "80": 4, "81": 1, "94": 1, "106": 1, "108": 1, "124": 1}, "202603": {"1": 552, "2": 2055, "3": 2091, "4": 1788, "5": 1696, "6": 1225, "7": 627, "8": 381, "9": 154, "10": 67, "11": 33, "12": 19, "13": 15, "14": 7, "15": 14, "16": 13, "17": 9, "18": 11, "19": 9, "20": 8, "21": 5, "22": 11, "23": 9, "24": 7, "26": 4, "27": 6, "28": 6, "29": 4, "30": 5, "31": 5, "32": 5, "33": 3, "34": 1, "35": 4, "36": 1, "37": 6, "38": 1, "39": 5, "40": 1, "41": 2, "42": 1, "44": 1, "50": 1, "51": 1, "53": 1, "63": 1, "64": 1, "66": 1, "68": 1, "74": 1, "75": 2, "77": 1, "82": 1}, "202604": {"1": 1113, "2": 3022, "3": 2355, "4": 1630, "5": 1642, "6": 1025, "7": 444, "8": 209, "9": 91, "10": 69, "11": 42, "12": 25, "13": 16, "14": 10, "15": 10, "16": 4, "17": 7, "18": 4, "19": 1, "20": 3, "21": 3, "22": 4, "23": 3, "24": 2, "28": 4, "29": 1, "30": 1, "32": 3, "34": 1, "36": 3, "37": 1, "38": 2, "40": 1, "43": 1, "44": 1, "45": 1, "47": 1, "52": 1, "53": 1, "58": 1, "60": 2, "61": 1, "66": 1, "70": 1}, "202605": {"1": 141, "2": 870, "3": 749, "4": 354, "5": 397, "6": 304, "7": 102, "8": 41, "9": 29, "10": 17, "11": 8, "12": 9, "13": 5, "14": 2, "15": 3, "16": 7, "18": 1, "19": 2, "21": 4, "22": 3, "23": 5, "27": 1, "37": 1, "38": 1, "39": 1, "46": 1, "52": 1}, "202606": {"1": 198, "2": 803, "3": 681, "4": 286, "5": 540, "6": 295, "7": 88, "8": 60, "9": 29, "10": 19, "11": 6, "12": 19, "13": 4, "14": 4, "15": 3, "16": 1, "19": 1, "21": 5, "22": 4, "23": 5, "24": 1}, "202609": {"3": 2, "4": 1}, "202610": {"1": 2, "3": 2, "4": 6, "5": 3, "7": 3, "8": 1, "9": 1, "10": 1, "11": 1, "21": 1, "283": 1}, "202611": {"7": 1}, "202612": {"3": 2, "5": 1, "16": 1}};

// ── ENTREGA POR CICLO DE USO ───────────────────────────────────
const ENTREGA_CICLO = {
  "202504": {
    "01. 1 A 30 D": {
      "total": 14,
      "entregue": 10,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 1,
        "01. ATE 2 DIAS": 1,
        "02. ATE 5 DIAS": 3,
        "03. ATE 7 DIAS": 4,
        "04. ATE 10 DIAS": 2
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
      "total": 482,
      "entregue": 425,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 10,
        "01. ATE 2 DIAS": 4,
        "02. ATE 5 DIAS": 150,
        "03. ATE 7 DIAS": 121,
        "04. ATE 10 DIAS": 66,
        "05. ACIMA DE 10 DIAS": 84
      }
    },
    "02. 31 A 60 D": {
      "total": 79,
      "entregue": 68,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 2,
        "02. ATE 5 DIAS": 17,
        "03. ATE 7 DIAS": 25,
        "04. ATE 10 DIAS": 11,
        "05. ACIMA DE 10 DIAS": 15
      }
    },
    "03. 61 A 90 D": {
      "total": 47,
      "entregue": 41,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 4,
        "02. ATE 5 DIAS": 16,
        "03. ATE 7 DIAS": 12,
        "04. ATE 10 DIAS": 5,
        "05. ACIMA DE 10 DIAS": 8
      }
    },
    "04. 91 A 120 D": {
      "total": 53,
      "entregue": 41,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 5,
        "01. ATE 2 DIAS": 1,
        "02. ATE 5 DIAS": 16,
        "03. ATE 7 DIAS": 10,
        "04. ATE 10 DIAS": 5,
        "05. ACIMA DE 10 DIAS": 9
      }
    },
    "05. 121 A 180 D": {
      "total": 72,
      "entregue": 57,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 8,
        "01. ATE 2 DIAS": 1,
        "02. ATE 5 DIAS": 13,
        "03. ATE 7 DIAS": 14,
        "04. ATE 10 DIAS": 16,
        "05. ACIMA DE 10 DIAS": 13
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 621,
      "entregue": 387,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 27,
        "01. ATE 2 DIAS": 6,
        "02. ATE 5 DIAS": 122,
        "03. ATE 7 DIAS": 115,
        "04. ATE 10 DIAS": 73,
        "05. ACIMA DE 10 DIAS": 71
      }
    }
  },
  "202506": {
    "01. 1 A 30 D": {
      "total": 7629,
      "entregue": 6687,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 222,
        "01. ATE 2 DIAS": 211,
        "02. ATE 5 DIAS": 2545,
        "03. ATE 7 DIAS": 1228,
        "04. ATE 10 DIAS": 1411,
        "05. ACIMA DE 10 DIAS": 1292
      }
    },
    "02. 31 A 60 D": {
      "total": 1283,
      "entregue": 1114,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 50,
        "01. ATE 2 DIAS": 29,
        "02. ATE 5 DIAS": 368,
        "03. ATE 7 DIAS": 219,
        "04. ATE 10 DIAS": 244,
        "05. ACIMA DE 10 DIAS": 254
      }
    },
    "03. 61 A 90 D": {
      "total": 800,
      "entregue": 715,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 16,
        "01. ATE 2 DIAS": 31,
        "02. ATE 5 DIAS": 251,
        "03. ATE 7 DIAS": 110,
        "04. ATE 10 DIAS": 164,
        "05. ACIMA DE 10 DIAS": 159
      }
    },
    "04. 91 A 120 D": {
      "total": 674,
      "entregue": 587,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 26,
        "01. ATE 2 DIAS": 18,
        "02. ATE 5 DIAS": 227,
        "03. ATE 7 DIAS": 105,
        "04. ATE 10 DIAS": 112,
        "05. ACIMA DE 10 DIAS": 125
      }
    },
    "05. 121 A 180 D": {
      "total": 1010,
      "entregue": 878,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 36,
        "01. ATE 2 DIAS": 29,
        "02. ATE 5 DIAS": 334,
        "03. ATE 7 DIAS": 160,
        "04. ATE 10 DIAS": 175,
        "05. ACIMA DE 10 DIAS": 180
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 8742,
      "entregue": 5319,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 319,
        "01. ATE 2 DIAS": 160,
        "02. ATE 5 DIAS": 2011,
        "03. ATE 7 DIAS": 974,
        "04. ATE 10 DIAS": 1063,
        "05. ACIMA DE 10 DIAS": 1111
      }
    }
  },
  "202507": {
    "01. 1 A 30 D": {
      "total": 13219,
      "entregue": 11613,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 508,
        "01. ATE 2 DIAS": 298,
        "02. ATE 5 DIAS": 2824,
        "03. ATE 7 DIAS": 2104,
        "04. ATE 10 DIAS": 2438,
        "05. ACIMA DE 10 DIAS": 3948
      }
    },
    "02. 31 A 60 D": {
      "total": 2239,
      "entregue": 1986,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 83,
        "01. ATE 2 DIAS": 36,
        "02. ATE 5 DIAS": 443,
        "03. ATE 7 DIAS": 323,
        "04. ATE 10 DIAS": 427,
        "05. ACIMA DE 10 DIAS": 757
      }
    },
    "03. 61 A 90 D": {
      "total": 1412,
      "entregue": 1231,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 63,
        "01. ATE 2 DIAS": 26,
        "02. ATE 5 DIAS": 262,
        "03. ATE 7 DIAS": 205,
        "04. ATE 10 DIAS": 280,
        "05. ACIMA DE 10 DIAS": 458
      }
    },
    "04. 91 A 120 D": {
      "total": 1037,
      "entregue": 912,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 45,
        "01. ATE 2 DIAS": 24,
        "02. ATE 5 DIAS": 225,
        "03. ATE 7 DIAS": 148,
        "04. ATE 10 DIAS": 200,
        "05. ACIMA DE 10 DIAS": 315
      }
    },
    "05. 121 A 180 D": {
      "total": 1757,
      "entregue": 1542,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 74,
        "01. ATE 2 DIAS": 36,
        "02. ATE 5 DIAS": 378,
        "03. ATE 7 DIAS": 253,
        "04. ATE 10 DIAS": 333,
        "05. ACIMA DE 10 DIAS": 542
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 18056,
      "entregue": 10756,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 689,
        "01. ATE 2 DIAS": 338,
        "02. ATE 5 DIAS": 2677,
        "03. ATE 7 DIAS": 1819,
        "04. ATE 10 DIAS": 2339,
        "05. ACIMA DE 10 DIAS": 3583
      }
    }
  },
  "202508": {
    "01. 1 A 30 D": {
      "total": 13018,
      "entregue": 11144,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 579,
        "01. ATE 2 DIAS": 1481,
        "02. ATE 5 DIAS": 4856,
        "03. ATE 7 DIAS": 2046,
        "04. ATE 10 DIAS": 1191,
        "05. ACIMA DE 10 DIAS": 1570
      }
    },
    "02. 31 A 60 D": {
      "total": 2181,
      "entregue": 1851,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 93,
        "01. ATE 2 DIAS": 238,
        "02. ATE 5 DIAS": 750,
        "03. ATE 7 DIAS": 354,
        "04. ATE 10 DIAS": 187,
        "05. ACIMA DE 10 DIAS": 322
      }
    },
    "03. 61 A 90 D": {
      "total": 1319,
      "entregue": 1090,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 61,
        "01. ATE 2 DIAS": 150,
        "02. ATE 5 DIAS": 434,
        "03. ATE 7 DIAS": 212,
        "04. ATE 10 DIAS": 111,
        "05. ACIMA DE 10 DIAS": 183
      }
    },
    "04. 91 A 120 D": {
      "total": 1106,
      "entregue": 963,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 45,
        "01. ATE 2 DIAS": 105,
        "02. ATE 5 DIAS": 397,
        "03. ATE 7 DIAS": 184,
        "04. ATE 10 DIAS": 105,
        "05. ACIMA DE 10 DIAS": 172
      }
    },
    "05. 121 A 180 D": {
      "total": 1792,
      "entregue": 1583,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 83,
        "01. ATE 2 DIAS": 207,
        "02. ATE 5 DIAS": 683,
        "03. ATE 7 DIAS": 273,
        "04. ATE 10 DIAS": 161,
        "05. ACIMA DE 10 DIAS": 259
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 20237,
      "entregue": 11086,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 825,
        "01. ATE 2 DIAS": 1426,
        "02. ATE 5 DIAS": 4589,
        "03. ATE 7 DIAS": 1996,
        "04. ATE 10 DIAS": 1248,
        "05. ACIMA DE 10 DIAS": 1827
      }
    }
  },
  "202509": {
    "01. 1 A 30 D": {
      "total": 15700,
      "entregue": 13532,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 660,
        "01. ATE 2 DIAS": 2533,
        "02. ATE 5 DIAS": 6339,
        "03. ATE 7 DIAS": 2203,
        "04. ATE 10 DIAS": 1083,
        "05. ACIMA DE 10 DIAS": 1373
      }
    },
    "02. 31 A 60 D": {
      "total": 2681,
      "entregue": 2337,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 92,
        "01. ATE 2 DIAS": 384,
        "02. ATE 5 DIAS": 1053,
        "03. ATE 7 DIAS": 409,
        "04. ATE 10 DIAS": 211,
        "05. ACIMA DE 10 DIAS": 280
      }
    },
    "03. 61 A 90 D": {
      "total": 1615,
      "entregue": 1400,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 50,
        "01. ATE 2 DIAS": 240,
        "02. ATE 5 DIAS": 619,
        "03. ATE 7 DIAS": 247,
        "04. ATE 10 DIAS": 113,
        "05. ACIMA DE 10 DIAS": 180
      }
    },
    "04. 91 A 120 D": {
      "total": 1255,
      "entregue": 1095,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 42,
        "01. ATE 2 DIAS": 189,
        "02. ATE 5 DIAS": 493,
        "03. ATE 7 DIAS": 192,
        "04. ATE 10 DIAS": 95,
        "05. ACIMA DE 10 DIAS": 126
      }
    },
    "05. 121 A 180 D": {
      "total": 2014,
      "entregue": 1813,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 68,
        "01. ATE 2 DIAS": 340,
        "02. ATE 5 DIAS": 821,
        "03. ATE 7 DIAS": 308,
        "04. ATE 10 DIAS": 131,
        "05. ACIMA DE 10 DIAS": 213
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 25031,
      "entregue": 13207,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 981,
        "01. ATE 2 DIAS": 2322,
        "02. ATE 5 DIAS": 6011,
        "03. ATE 7 DIAS": 2089,
        "04. ATE 10 DIAS": 1139,
        "05. ACIMA DE 10 DIAS": 1645
      }
    }
  },
  "202510": {
    "01. 1 A 30 D": {
      "total": 14402,
      "entregue": 12443,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 378,
        "01. ATE 2 DIAS": 3500,
        "02. ATE 5 DIAS": 5952,
        "03. ATE 7 DIAS": 1693,
        "04. ATE 10 DIAS": 670,
        "05. ACIMA DE 10 DIAS": 627
      }
    },
    "02. 31 A 60 D": {
      "total": 2334,
      "entregue": 2057,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 52,
        "01. ATE 2 DIAS": 489,
        "02. ATE 5 DIAS": 1015,
        "03. ATE 7 DIAS": 314,
        "04. ATE 10 DIAS": 132,
        "05. ACIMA DE 10 DIAS": 107
      }
    },
    "03. 61 A 90 D": {
      "total": 1375,
      "entregue": 1217,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 30,
        "01. ATE 2 DIAS": 275,
        "02. ATE 5 DIAS": 614,
        "03. ATE 7 DIAS": 190,
        "04. ATE 10 DIAS": 60,
        "05. ACIMA DE 10 DIAS": 78
      }
    },
    "04. 91 A 120 D": {
      "total": 1054,
      "entregue": 942,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 25,
        "01. ATE 2 DIAS": 256,
        "02. ATE 5 DIAS": 438,
        "03. ATE 7 DIAS": 143,
        "04. ATE 10 DIAS": 50,
        "05. ACIMA DE 10 DIAS": 55
      }
    },
    "05. 121 A 180 D": {
      "total": 2509,
      "entregue": 1983,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 74,
        "01. ATE 2 DIAS": 488,
        "02. ATE 5 DIAS": 956,
        "03. ATE 7 DIAS": 298,
        "04. ATE 10 DIAS": 123,
        "05. ACIMA DE 10 DIAS": 118
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 21530,
      "entregue": 11089,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 542,
        "01. ATE 2 DIAS": 2750,
        "02. ATE 5 DIAS": 5498,
        "03. ATE 7 DIAS": 1615,
        "04. ATE 10 DIAS": 592,
        "05. ACIMA DE 10 DIAS": 633
      }
    }
  },
  "202511": {
    "01. 1 A 30 D": {
      "total": 21625,
      "entregue": 18744,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 473,
        "01. ATE 2 DIAS": 4295,
        "02. ATE 5 DIAS": 9636,
        "03. ATE 7 DIAS": 3448,
        "04. ATE 10 DIAS": 819,
        "05. ACIMA DE 10 DIAS": 544
      }
    },
    "02. 31 A 60 D": {
      "total": 3569,
      "entregue": 3120,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 79,
        "01. ATE 2 DIAS": 635,
        "02. ATE 5 DIAS": 1618,
        "03. ATE 7 DIAS": 625,
        "04. ATE 10 DIAS": 130,
        "05. ACIMA DE 10 DIAS": 112
      }
    },
    "03. 61 A 90 D": {
      "total": 2157,
      "entregue": 1915,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 41,
        "01. ATE 2 DIAS": 393,
        "02. ATE 5 DIAS": 990,
        "03. ATE 7 DIAS": 351,
        "04. ATE 10 DIAS": 106,
        "05. ACIMA DE 10 DIAS": 75
      }
    },
    "04. 91 A 120 D": {
      "total": 1663,
      "entregue": 1533,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 28,
        "01. ATE 2 DIAS": 363,
        "02. ATE 5 DIAS": 741,
        "03. ATE 7 DIAS": 299,
        "04. ATE 10 DIAS": 60,
        "05. ACIMA DE 10 DIAS": 70
      }
    },
    "05. 121 A 180 D": {
      "total": 6730,
      "entregue": 4534,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 237,
        "01. ATE 2 DIAS": 995,
        "02. ATE 5 DIAS": 2333,
        "03. ATE 7 DIAS": 819,
        "04. ATE 10 DIAS": 215,
        "05. ACIMA DE 10 DIAS": 172
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 29786,
      "entregue": 14947,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 606,
        "01. ATE 2 DIAS": 3470,
        "02. ATE 5 DIAS": 7692,
        "03. ATE 7 DIAS": 2564,
        "04. ATE 10 DIAS": 644,
        "05. ACIMA DE 10 DIAS": 577
      }
    }
  },
  "202512": {
    "01. 1 A 30 D": {
      "total": 26035,
      "entregue": 22657,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 475,
        "01. ATE 2 DIAS": 3734,
        "02. ATE 5 DIAS": 11681,
        "03. ATE 7 DIAS": 4760,
        "04. ATE 10 DIAS": 1459,
        "05. ACIMA DE 10 DIAS": 1022
      }
    },
    "02. 31 A 60 D": {
      "total": 4242,
      "entregue": 3799,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 66,
        "01. ATE 2 DIAS": 550,
        "02. ATE 5 DIAS": 1891,
        "03. ATE 7 DIAS": 905,
        "04. ATE 10 DIAS": 263,
        "05. ACIMA DE 10 DIAS": 189
      }
    },
    "03. 61 A 90 D": {
      "total": 2619,
      "entregue": 2417,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 34,
        "01. ATE 2 DIAS": 393,
        "02. ATE 5 DIAS": 1211,
        "03. ATE 7 DIAS": 505,
        "04. ATE 10 DIAS": 183,
        "05. ACIMA DE 10 DIAS": 125
      }
    },
    "04. 91 A 120 D": {
      "total": 3522,
      "entregue": 2502,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 133,
        "01. ATE 2 DIAS": 382,
        "02. ATE 5 DIAS": 1209,
        "03. ATE 7 DIAS": 566,
        "04. ATE 10 DIAS": 191,
        "05. ACIMA DE 10 DIAS": 154
      }
    },
    "05. 121 A 180 D": {
      "total": 8119,
      "entregue": 5267,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 270,
        "01. ATE 2 DIAS": 809,
        "02. ATE 5 DIAS": 2766,
        "03. ATE 7 DIAS": 1081,
        "04. ATE 10 DIAS": 373,
        "05. ACIMA DE 10 DIAS": 238
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 33162,
      "entregue": 16779,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 579,
        "01. ATE 2 DIAS": 2769,
        "02. ATE 5 DIAS": 8399,
        "03. ATE 7 DIAS": 3457,
        "04. ATE 10 DIAS": 1263,
        "05. ACIMA DE 10 DIAS": 890
      }
    }
  },
  "202601": {
    "01. 1 A 30 D": {
      "total": 13102,
      "entregue": 11622,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 180,
        "01. ATE 2 DIAS": 2545,
        "02. ATE 5 DIAS": 5929,
        "03. ATE 7 DIAS": 2165,
        "04. ATE 10 DIAS": 661,
        "05. ACIMA DE 10 DIAS": 322
      }
    },
    "02. 31 A 60 D": {
      "total": 2045,
      "entregue": 1846,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 30,
        "01. ATE 2 DIAS": 378,
        "02. ATE 5 DIAS": 940,
        "03. ATE 7 DIAS": 349,
        "04. ATE 10 DIAS": 121,
        "05. ACIMA DE 10 DIAS": 58
      }
    },
    "03. 61 A 90 D": {
      "total": 2022,
      "entregue": 1592,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 53,
        "01. ATE 2 DIAS": 356,
        "02. ATE 5 DIAS": 802,
        "03. ATE 7 DIAS": 278,
        "04. ATE 10 DIAS": 100,
        "05. ACIMA DE 10 DIAS": 56
      }
    },
    "04. 91 A 120 D": {
      "total": 2696,
      "entregue": 1932,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 79,
        "01. ATE 2 DIAS": 439,
        "02. ATE 5 DIAS": 929,
        "03. ATE 7 DIAS": 380,
        "04. ATE 10 DIAS": 120,
        "05. ACIMA DE 10 DIAS": 64
      }
    },
    "05. 121 A 180 D": {
      "total": 2921,
      "entregue": 1829,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 75,
        "01. ATE 2 DIAS": 408,
        "02. ATE 5 DIAS": 935,
        "03. ATE 7 DIAS": 339,
        "04. ATE 10 DIAS": 79,
        "05. ACIMA DE 10 DIAS": 68
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 15389,
      "entregue": 7953,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 183,
        "01. ATE 2 DIAS": 1804,
        "02. ATE 5 DIAS": 4169,
        "03. ATE 7 DIAS": 1361,
        "04. ATE 10 DIAS": 367,
        "05. ACIMA DE 10 DIAS": 252
      }
    }
  },
  "202602": {
    "01. 1 A 30 D": {
      "total": 6925,
      "entregue": 5985,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 85,
        "01. ATE 2 DIAS": 1303,
        "02. ATE 5 DIAS": 3154,
        "03. ATE 7 DIAS": 1095,
        "04. ATE 10 DIAS": 281,
        "05. ACIMA DE 10 DIAS": 151
      }
    },
    "02. 31 A 60 D": {
      "total": 1440,
      "entregue": 1136,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 34,
        "01. ATE 2 DIAS": 230,
        "02. ATE 5 DIAS": 595,
        "03. ATE 7 DIAS": 210,
        "04. ATE 10 DIAS": 64,
        "05. ACIMA DE 10 DIAS": 36
      }
    },
    "03. 61 A 90 D": {
      "total": 1850,
      "entregue": 1219,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 59,
        "01. ATE 2 DIAS": 239,
        "02. ATE 5 DIAS": 660,
        "03. ATE 7 DIAS": 224,
        "04. ATE 10 DIAS": 62,
        "05. ACIMA DE 10 DIAS": 34
      }
    },
    "04. 91 A 120 D": {
      "total": 948,
      "entregue": 564,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 18,
        "01. ATE 2 DIAS": 116,
        "02. ATE 5 DIAS": 294,
        "03. ATE 7 DIAS": 104,
        "04. ATE 10 DIAS": 33,
        "05. ACIMA DE 10 DIAS": 17
      }
    },
    "05. 121 A 180 D": {
      "total": 1534,
      "entregue": 818,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 29,
        "01. ATE 2 DIAS": 174,
        "02. ATE 5 DIAS": 407,
        "03. ATE 7 DIAS": 180,
        "04. ATE 10 DIAS": 36,
        "05. ACIMA DE 10 DIAS": 21
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 8278,
      "entregue": 4068,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 107,
        "01. ATE 2 DIAS": 853,
        "02. ATE 5 DIAS": 2190,
        "03. ATE 7 DIAS": 717,
        "04. ATE 10 DIAS": 199,
        "05. ACIMA DE 10 DIAS": 109
      }
    }
  },
  "202603": {
    "01. 1 A 30 D": {
      "total": 5244,
      "entregue": 4419,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 64,
        "01. ATE 2 DIAS": 1036,
        "02. ATE 5 DIAS": 2285,
        "03. ATE 7 DIAS": 778,
        "04. ATE 10 DIAS": 222,
        "05. ACIMA DE 10 DIAS": 98
      }
    },
    "02. 31 A 60 D": {
      "total": 1759,
      "entregue": 1168,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 52,
        "01. ATE 2 DIAS": 264,
        "02. ATE 5 DIAS": 594,
        "03. ATE 7 DIAS": 216,
        "04. ATE 10 DIAS": 65,
        "05. ACIMA DE 10 DIAS": 29
      }
    },
    "03. 61 A 90 D": {
      "total": 833,
      "entregue": 512,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 15,
        "01. ATE 2 DIAS": 109,
        "02. ATE 5 DIAS": 251,
        "03. ATE 7 DIAS": 98,
        "04. ATE 10 DIAS": 42,
        "05. ACIMA DE 10 DIAS": 12
      }
    },
    "04. 91 A 120 D": {
      "total": 676,
      "entregue": 391,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 15,
        "01. ATE 2 DIAS": 93,
        "02. ATE 5 DIAS": 200,
        "03. ATE 7 DIAS": 58,
        "04. ATE 10 DIAS": 29,
        "05. ACIMA DE 10 DIAS": 11
      }
    },
    "05. 121 A 180 D": {
      "total": 1118,
      "entregue": 534,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 18,
        "01. ATE 2 DIAS": 114,
        "02. ATE 5 DIAS": 272,
        "03. ATE 7 DIAS": 97,
        "04. ATE 10 DIAS": 39,
        "05. ACIMA DE 10 DIAS": 12
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 6191,
      "entregue": 3097,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 85,
        "01. ATE 2 DIAS": 766,
        "02. ATE 5 DIAS": 1599,
        "03. ATE 7 DIAS": 497,
        "04. ATE 10 DIAS": 165,
        "05. ACIMA DE 10 DIAS": 70
      }
    }
  },
  "202604": {
    "01. 1 A 30 D": {
      "total": 8164,
      "entregue": 5203,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 588,
        "01. ATE 2 DIAS": 1946,
        "02. ATE 5 DIAS": 2588,
        "03. ATE 7 DIAS": 725,
        "04. ATE 10 DIAS": 196,
        "05. ACIMA DE 10 DIAS": 82
      }
    },
    "02. 31 A 60 D": {
      "total": 1563,
      "entregue": 851,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 115,
        "01. ATE 2 DIAS": 305,
        "02. ATE 5 DIAS": 446,
        "03. ATE 7 DIAS": 114,
        "04. ATE 10 DIAS": 26,
        "05. ACIMA DE 10 DIAS": 12
      }
    },
    "03. 61 A 90 D": {
      "total": 1108,
      "entregue": 515,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 63,
        "01. ATE 2 DIAS": 186,
        "02. ATE 5 DIAS": 286,
        "03. ATE 7 DIAS": 67,
        "04. ATE 10 DIAS": 23,
        "05. ACIMA DE 10 DIAS": 5
      }
    },
    "04. 91 A 120 D": {
      "total": 916,
      "entregue": 355,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 55,
        "01. ATE 2 DIAS": 137,
        "02. ATE 5 DIAS": 192,
        "03. ATE 7 DIAS": 53,
        "04. ATE 10 DIAS": 7,
        "05. ACIMA DE 10 DIAS": 5
      }
    },
    "05. 121 A 180 D": {
      "total": 1536,
      "entregue": 588,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 95,
        "01. ATE 2 DIAS": 209,
        "02. ATE 5 DIAS": 317,
        "03. ATE 7 DIAS": 89,
        "04. ATE 10 DIAS": 16,
        "05. ACIMA DE 10 DIAS": 13
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 9013,
      "entregue": 3349,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 460,
        "01. ATE 2 DIAS": 1352,
        "02. ATE 5 DIAS": 1798,
        "03. ATE 7 DIAS": 421,
        "04. ATE 10 DIAS": 101,
        "05. ACIMA DE 10 DIAS": 46
      }
    }
  },
  "202605": {
    "01. 1 A 30 D": {
      "total": 13987,
      "entregue": 998,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 360,
        "01. ATE 2 DIAS": 387,
        "02. ATE 5 DIAS": 533,
        "03. ATE 7 DIAS": 148,
        "04. ATE 10 DIAS": 40,
        "05. ACIMA DE 10 DIAS": 19
      }
    },
    "02. 31 A 60 D": {
      "total": 2862,
      "entregue": 264,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 64,
        "01. ATE 2 DIAS": 85,
        "02. ATE 5 DIAS": 148,
        "03. ATE 7 DIAS": 35,
        "04. ATE 10 DIAS": 7,
        "05. ACIMA DE 10 DIAS": 9
      }
    },
    "03. 61 A 90 D": {
      "total": 2078,
      "entregue": 174,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 40,
        "01. ATE 2 DIAS": 62,
        "02. ATE 5 DIAS": 98,
        "03. ATE 7 DIAS": 21,
        "04. ATE 10 DIAS": 4,
        "05. ACIMA DE 10 DIAS": 3
      }
    },
    "04. 91 A 120 D": {
      "total": 1513,
      "entregue": 116,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 23,
        "01. ATE 2 DIAS": 45,
        "02. ATE 5 DIAS": 49,
        "03. ATE 7 DIAS": 26,
        "05. ACIMA DE 10 DIAS": 4
      }
    },
    "05. 121 A 180 D": {
      "total": 2509,
      "entregue": 171,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 31,
        "01. ATE 2 DIAS": 51,
        "02. ATE 5 DIAS": 94,
        "03. ATE 7 DIAS": 33,
        "04. ATE 10 DIAS": 3,
        "05. ACIMA DE 10 DIAS": 4
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 13810,
      "entregue": 1087,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 185,
        "01. ATE 2 DIAS": 381,
        "02. ATE 5 DIAS": 578,
        "03. ATE 7 DIAS": 143,
        "04. ATE 10 DIAS": 33,
        "05. ACIMA DE 10 DIAS": 16
      }
    }
  },
  "202606": {
    "01. 1 A 30 D": {
      "total": 22806,
      "entregue": 1017,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 590,
        "01. ATE 2 DIAS": 360,
        "02. ATE 5 DIAS": 614,
        "03. ATE 7 DIAS": 144,
        "04. ATE 10 DIAS": 51,
        "05. ACIMA DE 10 DIAS": 26
      }
    },
    "02. 31 A 60 D": {
      "total": 4851,
      "entregue": 278,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 85,
        "01. ATE 2 DIAS": 109,
        "02. ATE 5 DIAS": 147,
        "03. ATE 7 DIAS": 40,
        "04. ATE 10 DIAS": 17,
        "05. ACIMA DE 10 DIAS": 5
      }
    },
    "03. 61 A 90 D": {
      "total": 2938,
      "entregue": 141,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 53,
        "01. ATE 2 DIAS": 51,
        "02. ATE 5 DIAS": 73,
        "03. ATE 7 DIAS": 22,
        "04. ATE 10 DIAS": 7,
        "05. ACIMA DE 10 DIAS": 5
      }
    },
    "04. 91 A 120 D": {
      "total": 2228,
      "entregue": 116,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 42,
        "01. ATE 2 DIAS": 43,
        "02. ATE 5 DIAS": 65,
        "03. ATE 7 DIAS": 18,
        "04. ATE 10 DIAS": 3,
        "05. ACIMA DE 10 DIAS": 1
      }
    },
    "05. 121 A 180 D": {
      "total": 3702,
      "entregue": 162,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 45,
        "01. ATE 2 DIAS": 68,
        "02. ATE 5 DIAS": 84,
        "03. ATE 7 DIAS": 23,
        "04. ATE 10 DIAS": 4
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 20313,
      "entregue": 965,
      "faixas": {
        "00. CARTAO NAO ENTREGUE": 241,
        "01. ATE 2 DIAS": 370,
        "02. ATE 5 DIAS": 524,
        "03. ATE 7 DIAS": 136,
        "04. ATE 10 DIAS": 26,
        "05. ACIMA DE 10 DIAS": 16
      }
    }
  },
  "202607": {
    "01. 1 A 30 D": {
      "total": 21764,
      "entregue": 0,
      "faixas": {}
    },
    "02. 31 A 60 D": {
      "total": 3071,
      "entregue": 0,
      "faixas": {}
    },
    "03. 61 A 90 D": {
      "total": 1993,
      "entregue": 0,
      "faixas": {}
    },
    "04. 91 A 120 D": {
      "total": 1520,
      "entregue": 0,
      "faixas": {}
    },
    "05. 121 A 180 D": {
      "total": 2105,
      "entregue": 0,
      "faixas": {}
    },
    "06. ACIMA DE 180 D": {
      "total": 117,
      "entregue": 0,
      "faixas": {}
    }
  },
  "202608": {
    "01. 1 A 30 D": {
      "total": 16028,
      "entregue": 0,
      "faixas": {}
    },
    "02. 31 A 60 D": {
      "total": 2247,
      "entregue": 0,
      "faixas": {}
    },
    "03. 61 A 90 D": {
      "total": 1430,
      "entregue": 0,
      "faixas": {}
    },
    "04. 91 A 120 D": {
      "total": 1093,
      "entregue": 0,
      "faixas": {}
    },
    "05. 121 A 180 D": {
      "total": 836,
      "entregue": 0,
      "faixas": {}
    },
    "06. ACIMA DE 180 D": {
      "total": 66,
      "entregue": 0,
      "faixas": {}
    }
  },
  "202609": {
    "01. 1 A 30 D": {
      "total": 25822,
      "entregue": 0,
      "faixas": {}
    },
    "02. 31 A 60 D": {
      "total": 3496,
      "entregue": 0,
      "faixas": {}
    },
    "03. 61 A 90 D": {
      "total": 2170,
      "entregue": 0,
      "faixas": {}
    },
    "04. 91 A 120 D": {
      "total": 1404,
      "entregue": 2,
      "faixas": {
        "02. ATE 5 DIAS": 2
      }
    },
    "05. 121 A 180 D": {
      "total": 22,
      "entregue": 0,
      "faixas": {}
    },
    "06. ACIMA DE 180 D": {
      "total": 95,
      "entregue": 1,
      "faixas": {
        "02. ATE 5 DIAS": 1
      }
    }
  },
  "202610": {
    "01. 1 A 30 D": {
      "total": 37253,
      "entregue": 12,
      "faixas": {
        "01. ATE 2 DIAS": 2,
        "02. ATE 5 DIAS": 8,
        "03. ATE 7 DIAS": 1,
        "04. ATE 10 DIAS": 1
      }
    },
    "02. 31 A 60 D": {
      "total": 4973,
      "entregue": 0,
      "faixas": {}
    },
    "03. 61 A 90 D": {
      "total": 2622,
      "entregue": 1,
      "faixas": {
        "02. ATE 5 DIAS": 1
      }
    },
    "04. 91 A 120 D": {
      "total": 29,
      "entregue": 1,
      "faixas": {
        "02. ATE 5 DIAS": 1
      }
    },
    "05. 121 A 180 D": {
      "total": 23,
      "entregue": 2,
      "faixas": {
        "03. ATE 7 DIAS": 2
      }
    },
    "06. ACIMA DE 180 D": {
      "total": 129,
      "entregue": 6,
      "faixas": {
        "02. ATE 5 DIAS": 1,
        "04. ATE 10 DIAS": 2,
        "05. ACIMA DE 10 DIAS": 3
      }
    }
  },
  "202611": {
    "01. 1 A 30 D": {
      "total": 13015,
      "entregue": 1,
      "faixas": {
        "03. ATE 7 DIAS": 1
      }
    },
    "02. 31 A 60 D": {
      "total": 1528,
      "entregue": 0,
      "faixas": {}
    },
    "03. 61 A 90 D": {
      "total": 11,
      "entregue": 0,
      "faixas": {}
    },
    "04. 91 A 120 D": {
      "total": 7,
      "entregue": 0,
      "faixas": {}
    },
    "05. 121 A 180 D": {
      "total": 8,
      "entregue": 0,
      "faixas": {}
    },
    "06. ACIMA DE 180 D": {
      "total": 35,
      "entregue": 0,
      "faixas": {}
    }
  },
  "202612": {
    "01. 1 A 30 D": {
      "total": 31585,
      "entregue": 2,
      "faixas": {
        "02. ATE 5 DIAS": 2
      }
    },
    "02. 31 A 60 D": {
      "total": 21,
      "entregue": 0,
      "faixas": {}
    },
    "03. 61 A 90 D": {
      "total": 15,
      "entregue": 0,
      "faixas": {}
    },
    "04. 91 A 120 D": {
      "total": 8,
      "entregue": 0,
      "faixas": {}
    },
    "05. 121 A 180 D": {
      "total": 12,
      "entregue": 0,
      "faixas": {}
    },
    "06. ACIMA DE 180 D": {
      "total": 63,
      "entregue": 2,
      "faixas": {
        "02. ATE 5 DIAS": 1,
        "05. ACIMA DE 10 DIAS": 1
      }
    }
  }
};

const TOTAL_GRUPO1 = {"202504": 19, "202505": 1354, "202506": 20138, "202507": 37720, "202508": 39653, "202509": 48296, "202510": 43204, "202511": 65530, "202512": 77699, "202601": 38175, "202602": 20975, "202603": 15821, "202604": 22300, "202605": 36759, "202606": 56838, "202607": 30570, "202608": 21700, "202609": 33009, "202610": 45029, "202611": 14604, "202612": 31704};
const TOTAL_GRUPO2 = {"202503": 3, "202504": 7, "202505": 6180, "202506": 81730, "202507": 193506, "202508": 221906, "202509": 295381, "202510": 227158, "202511": 350867, "202512": 366056, "202601": 175901, "202602": 82263, "202603": 65427, "202604": 100620, "202605": 166137, "202606": 221410, "202607": 242833, "202608": 185471, "202609": 307526, "202610": 427185, "202611": 165993, "202612": 398750};
const TOTAL_EXPIRADO = {"202504": 19, "202505": 1354, "202506": 20138, "202507": 37720, "202508": 39653, "202509": 48296, "202510": 43204, "202511": 65530, "202512": 77699, "202601": 38175, "202602": 20975, "202603": 15821, "202604": 22300, "202605": 36759, "202606": 56838, "202607": 30570, "202608": 21700, "202609": 33009, "202610": 45029, "202611": 14604, "202612": 31704};

// ── BREAKDOWN POR PRODUTO ────────────────────────────────────
const MONTHLY_HIBRIDO = [{"mes": "Abr/25", "ren": 14, "rei": 1}, {"mes": "Mai/25", "ren": 901, "rei": 43}, {"mes": "Jun/25", "ren": 13864, "rei": 732}, {"mes": "Jul/25", "ren": 25516, "rei": 1118}, {"mes": "Ago/25", "ren": 25200, "rei": 1228}, {"mes": "Set/25", "ren": 30191, "rei": 1598}, {"mes": "Out/25", "ren": 26278, "rei": 1114}, {"mes": "Nov/25", "ren": 39813, "rei": 1742}, {"mes": "Dez/25", "ren": 48251, "rei": 3066}, {"mes": "Jan/26", "ren": 24016, "rei": 1617}, {"mes": "Fev/26", "ren": 12779, "rei": 1201}, {"mes": "Mar/26", "ren": 9462, "rei": 844}, {"mes": "Abr/26", "ren": 11997, "rei": 0}, {"mes": "Mai/26", "ren": 3523, "rei": 0}, {"mes": "Jun/26", "ren": 3833, "rei": 0}, {"mes": "Set/26", "ren": 2, "rei": 0}, {"mes": "Out/26", "ren": 12, "rei": 0}, {"mes": "Nov/26", "ren": 0, "rei": 0}, {"mes": "Dez/26", "ren": 3, "rei": 0}];
const MONTHLY_DEBITO  = [{"mes": "Mai/25", "ren": 174, "rei": 24}, {"mes": "Jun/25", "ren": 2105, "rei": 267}, {"mes": "Jul/25", "ren": 3985, "rei": 459}, {"mes": "Ago/25", "ren": 4203, "rei": 572}, {"mes": "Set/25", "ren": 5083, "rei": 642}, {"mes": "Out/25", "ren": 4552, "rei": 641}, {"mes": "Nov/25", "ren": 6442, "rei": 932}, {"mes": "Dez/25", "ren": 6724, "rei": 995}, {"mes": "Jan/26", "ren": 3358, "rei": 459}, {"mes": "Fev/26", "ren": 1341, "rei": 266}, {"mes": "Mar/26", "ren": 908, "rei": 187}, {"mes": "Abr/26", "ren": 1142, "rei": 0}, {"mes": "Mai/26", "ren": 239, "rei": 0}, {"mes": "Jun/26", "ren": 275, "rei": 0}, {"mes": "Jul/26", "ren": 0, "rei": 0}, {"mes": "Ago/26", "ren": 0, "rei": 0}, {"mes": "Set/26", "ren": 1, "rei": 0}, {"mes": "Out/26", "ren": 10, "rei": 0}, {"mes": "Nov/26", "ren": 1, "rei": 0}, {"mes": "Dez/26", "ren": 1, "rei": 0}];

const MONTHLY_G2 = [{"mes": "Mar/25", "ren": 0, "rei": 0, "tel": 3}, {"mes": "Abr/25", "ren": 0, "rei": 0, "tel": 7}, {"mes": "Mai/25", "ren": 155, "rei": 172, "tel": 6180}, {"mes": "Jun/25", "ren": 2922, "rei": 1852, "tel": 81730}, {"mes": "Jul/25", "ren": 7732, "rei": 3816, "tel": 193506}, {"mes": "Ago/25", "ren": 7862, "rei": 4877, "tel": 221906}, {"mes": "Set/25", "ren": 7566, "rei": 6720, "tel": 295381}, {"mes": "Out/25", "ren": 7575, "rei": 3552, "tel": 227158}, {"mes": "Nov/25", "ren": 12896, "rei": 6590, "tel": 350867}, {"mes": "Dez/25", "ren": 14421, "rei": 7552, "tel": 366056}, {"mes": "Jan/26", "ren": 7602, "rei": 3539, "tel": 175901}, {"mes": "Fev/26", "ren": 3686, "rei": 1597, "tel": 82263}, {"mes": "Mar/26", "ren": 3160, "rei": 1035, "tel": 65427}, {"mes": "Abr/26", "ren": 2993, "rei": 0, "tel": 100620}, {"mes": "Mai/26", "ren": 1469, "rei": 0, "tel": 166137}, {"mes": "Jun/26", "ren": 1352, "rei": 0, "tel": 221410}, {"mes": "Jul/26", "ren": 0, "rei": 0, "tel": 242833}, {"mes": "Ago/26", "ren": 0, "rei": 0, "tel": 185471}, {"mes": "Set/26", "ren": 3, "rei": 0, "tel": 307526}, {"mes": "Out/26", "ren": 20, "rei": 0, "tel": 427185}, {"mes": "Nov/26", "ren": 0, "rei": 0, "tel": 165993}, {"mes": "Dez/26", "ren": 4, "rei": 0, "tel": 398750}];

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