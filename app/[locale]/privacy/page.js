import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = { ko: '개인정보처리방침', en: 'Privacy Policy', ja: 'プライバシーポリシー', zh: '隐私政策', fr: 'Politique de confidentialité', es: 'Política de privacidad', hi: 'गोपनीयता नीति' };
  const descs = {
    ko: 'Pixkit 개인정보처리방침 — 이미지 데이터 수집 및 처리에 관한 안내.',
    en: 'Pixkit Privacy Policy — How we handle your image data and personal information.',
    ja: 'Pixkit プライバシーポリシー — 画像データおよび個人情報の取り扱いについて。',
    zh: 'Pixkit 隐私政策 — 关于图片数据收集和处理的说明。',
    fr: 'Politique de confidentialité Pixkit — Comment nous traitons vos données d\'images et informations personnelles.',
    es: 'Política de privacidad de Pixkit — Cómo manejamos sus datos de imagen e información personal.',
    hi: 'Pixkit गोपनीयता नीति — हम आपके इमेज डेटा और व्यक्तिगत जानकारी को कैसे संभालते हैं।',
  };
  const baseUrl = 'https://pixkit.app';
  const prefix = locale === 'ko' ? '' : `/${locale}`;
  const languages = {};
  ['ko', 'en', 'ja', 'zh', 'fr', 'es', 'hi'].forEach((l) => {
    const p = l === 'ko' ? '' : `/${l}`;
    languages[l] = `${baseUrl}${p}/privacy`;
  });
  languages['x-default'] = `${baseUrl}/privacy`;
  return {
    title: titles[locale] || titles.ko,
    description: descs[locale] || descs.ko,
    alternates: { canonical: `${baseUrl}${prefix}/privacy`, languages },
  };
}

const content = {
  ko: {
    title: '개인정보처리방침',
    effective: '시행일: 2026년 1월 1일 | 최종 수정: 2026년 2월 20일',
    sections: [
      { heading: '1. 개요', body: 'Pixkit(이하 "서비스")은 개인이 운영하는 무료 온라인 이미지 처리 도구입니다. 본 개인정보처리방침은 서비스 이용 과정에서 개인정보가 어떻게 처리되는지 설명합니다.' },
      { heading: '2. 이미지 데이터 처리', body: 'Pixkit의 모든 이미지 처리(리사이즈, 크롭, 회전, 변환, PDF 변환 등)는 사용자의 웹 브라우저 내에서 수행됩니다. 사용자가 업로드하는 이미지는 외부 서버로 전송되지 않으며, 서버에 저장되지 않습니다.', list: ['이미지 파일은 사용자의 기기 메모리에서만 처리됩니다.', '처리 결과물은 사용자의 기기에 직접 다운로드됩니다.', '브라우저를 닫으면 모든 임시 데이터가 자동으로 삭제됩니다.'] },
      { heading: '3. 수집하는 정보', body: 'Pixkit은 서비스 개선 및 분석을 위해 다음과 같은 비개인 정보를 수집할 수 있습니다.', list: ['방문 페이지 및 이용 시간 (Google Analytics 등 분석 도구를 통해)', '브라우저 종류, 운영체제, 화면 해상도', '유입 경로(Referrer URL)'], after: '이러한 정보는 개인을 특정할 수 없는 익명 정보이며, 서비스 품질 향상 목적으로만 사용됩니다.' },
      { heading: '4. 쿠키', body: 'Pixkit은 분석 도구 및 광고 서비스(Google AdSense)를 위해 쿠키를 사용할 수 있습니다. 사용자는 브라우저 설정을 통해 쿠키 수집을 거부할 수 있으며, 이 경우 서비스 이용에는 영향이 없습니다.' },
      { heading: '5. 광고', body: 'Pixkit은 서비스 운영을 위해 Google AdSense를 통한 광고를 게재할 수 있습니다. Google은 사용자의 관심사에 기반한 광고를 표시하기 위해 쿠키를 사용할 수 있습니다. 이에 대한 자세한 내용은 Google의 광고 개인정보보호 정책을 참조하시기 바랍니다.' },
      { heading: '6. 제3자 제공', body: 'Pixkit은 사용자의 개인정보를 제3자에게 판매, 거래 또는 임대하지 않습니다. 단, 법률에 의한 요청이 있는 경우에는 관련 법령에 따라 정보를 제공할 수 있습니다.' },
      { heading: '7. 아동의 개인정보 보호', body: 'Pixkit은 만 14세 미만 아동으로부터 고의로 개인정보를 수집하지 않습니다. 만약 14세 미만 아동의 개인정보가 수집된 사실을 인지한 경우, 즉시 해당 정보를 삭제하겠습니다.' },
      { heading: '8. 방침 변경', body: '본 개인정보처리방침은 법령 변경이나 서비스 정책 변경에 따라 수정될 수 있습니다. 변경 시 본 페이지에 업데이트하며, 중요한 변경 사항의 경우 서비스 내 공지를 통해 안내하겠습니다.' },
      { heading: '9. 문의', body: '개인정보처리방침에 관한 문의 사항이 있으시면 아래로 연락해 주시기 바랍니다.', contact: true },
    ],
  },
  en: {
    title: 'Privacy Policy',
    effective: 'Effective: January 1, 2026 | Last Updated: February 20, 2026',
    sections: [
      { heading: '1. Overview', body: 'Pixkit (hereinafter "the Service") is a free online image processing tool operated by an individual. This Privacy Policy explains how personal information is handled when using the Service.' },
      { heading: '2. Image Data Processing', body: 'All image processing in Pixkit (resize, crop, rotate, convert, PDF conversion, etc.) is performed within the user\'s web browser. Images uploaded by users are not transmitted to or stored on external servers.', list: ['Image files are processed only in the user\'s device memory.', 'Processed results are downloaded directly to the user\'s device.', 'All temporary data is automatically deleted when the browser is closed.'] },
      { heading: '3. Information We Collect', body: 'Pixkit may collect the following non-personal information for service improvement and analysis:', list: ['Pages visited and time spent (through analytics tools such as Google Analytics)', 'Browser type, operating system, screen resolution', 'Referrer URL'], after: 'This information is anonymous and cannot identify individuals. It is used solely for the purpose of improving service quality.' },
      { heading: '4. Cookies', body: 'Pixkit may use cookies for analytics tools and advertising services (Google AdSense). Users can refuse cookie collection through browser settings, which will not affect the use of the Service.' },
      { heading: '5. Advertising', body: 'Pixkit may display advertisements through Google AdSense to support service operations. Google may use cookies to display interest-based ads. For more information, please refer to Google\'s advertising privacy policy.' },
      { heading: '6. Third-Party Disclosure', body: 'Pixkit does not sell, trade, or rent users\' personal information to third parties. However, information may be provided in accordance with applicable laws when required by legal requests.' },
      { heading: '7. Children\'s Privacy', body: 'Pixkit does not knowingly collect personal information from children under the age of 14. If we become aware that personal information of a child under 14 has been collected, we will promptly delete that information.' },
      { heading: '8. Policy Changes', body: 'This Privacy Policy may be modified in accordance with changes in laws or service policies. Updates will be posted on this page, and significant changes will be announced through in-service notifications.' },
      { heading: '9. Contact', body: 'If you have any questions regarding this Privacy Policy, please contact us at the information below.', contact: true },
    ],
  },
  ja: {
    title: 'プライバシーポリシー',
    effective: '施行日: 2026年1月1日 | 最終更新: 2026年2月20日',
    sections: [
      { heading: '1. 概要', body: 'Pixkit（以下「本サービス」）は、個人が運営する無料のオンライン画像処理ツールです。本プライバシーポリシーは、本サービスの利用過程における個人情報の取り扱いについて説明します。' },
      { heading: '2. 画像データの処理', body: 'Pixkitのすべての画像処理（リサイズ、クロップ、回転、変換、PDF変換など）は、ユーザーのウェブブラウザ内で実行されます。ユーザーがアップロードする画像は外部サーバーに送信されず、サーバーに保存されることもありません。', list: ['画像ファイルはユーザーのデバイスメモリ内でのみ処理されます。', '処理結果はユーザーのデバイスに直接ダウンロードされます。', 'ブラウザを閉じると、すべての一時データが自動的に削除されます。'] },
      { heading: '3. 収集する情報', body: 'Pixkitは、サービス改善および分析のため、以下の非個人情報を収集する場合があります。', list: ['訪問ページおよび利用時間（Google Analyticsなどの分析ツールを通じて）', 'ブラウザの種類、オペレーティングシステム、画面解像度', '流入経路（リファラーURL）'], after: 'これらの情報は個人を特定できない匿名情報であり、サービス品質向上の目的でのみ使用されます。' },
      { heading: '4. クッキー', body: 'Pixkitは、分析ツールおよび広告サービス（Google AdSense）のためにクッキーを使用する場合があります。ユーザーはブラウザの設定を通じてクッキーの収集を拒否することができ、その場合でもサービスの利用には影響ありません。' },
      { heading: '5. 広告', body: 'Pixkitは、サービス運営のためにGoogle AdSenseを通じた広告を掲載する場合があります。Googleは、ユーザーの関心に基づいた広告を表示するためにクッキーを使用する場合があります。詳細については、Googleの広告プライバシーポリシーをご参照ください。' },
      { heading: '6. 第三者への提供', body: 'Pixkitは、ユーザーの個人情報を第三者に販売、取引、または貸与しません。ただし、法律による要請がある場合には、関連法令に従って情報を提供することがあります。' },
      { heading: '7. 児童の個人情報保護', body: 'Pixkitは、14歳未満の児童から意図的に個人情報を収集しません。14歳未満の児童の個人情報が収集されたことを認識した場合、直ちに当該情報を削除します。' },
      { heading: '8. ポリシーの変更', body: '本プライバシーポリシーは、法令の変更やサービスポリシーの変更に応じて修正される場合があります。変更時には本ページに更新し、重要な変更の場合はサービス内のお知らせを通じてご案内します。' },
      { heading: '9. お問い合わせ', body: 'プライバシーポリシーに関するお問い合わせは、下記までご連絡ください。', contact: true },
    ],
  },
  zh: {
    title: '隐私政策',
    effective: '生效日期：2026年1月1日 | 最后更新：2026年2月20日',
    sections: [
      { heading: '1. 概述', body: 'Pixkit（以下简称"本服务"）是由个人运营的免费在线图片处理工具。本隐私政策说明了在使用本服务过程中个人信息的处理方式。' },
      { heading: '2. 图片数据处理', body: 'Pixkit的所有图片处理（调整大小、裁剪、旋转、转换、PDF转换等）均在用户的网页浏览器中执行。用户上传的图片不会被传输到外部服务器，也不会被存储在服务器上。', list: ['图片文件仅在用户设备内存中处理。', '处理结果直接下载到用户设备。', '关闭浏览器后，所有临时数据会自动删除。'] },
      { heading: '3. 收集的信息', body: 'Pixkit可能会为改善服务和分析目的收集以下非个人信息：', list: ['访问页面和使用时间（通过Google Analytics等分析工具）', '浏览器类型、操作系统、屏幕分辨率', '来源路径（Referrer URL）'], after: '这些信息是无法识别个人身份的匿名信息，仅用于提高服务质量。' },
      { heading: '4. Cookie', body: 'Pixkit可能会为分析工具和广告服务（Google AdSense）使用Cookie。用户可以通过浏览器设置拒绝Cookie收集，这不会影响服务的使用。' },
      { heading: '5. 广告', body: 'Pixkit可能会通过Google AdSense展示广告以支持服务运营。Google可能会使用Cookie来显示基于用户兴趣的广告。有关详细信息，请参阅Google的广告隐私政策。' },
      { heading: '6. 第三方披露', body: 'Pixkit不会向第三方出售、交易或出租用户的个人信息。但在法律要求的情况下，可能会根据相关法律法规提供信息。' },
      { heading: '7. 儿童隐私保护', body: 'Pixkit不会故意收集14岁以下儿童的个人信息。如果我们发现已收集14岁以下儿童的个人信息，将立即删除相关信息。' },
      { heading: '8. 政策变更', body: '本隐私政策可能会根据法律法规或服务政策的变更而修改。变更时将在本页面更新，重要变更将通过服务内通知进行告知。' },
      { heading: '9. 联系方式', body: '如对本隐私政策有任何疑问，请通过以下方式联系我们。', contact: true },
    ],
  },
  fr: {
    title: 'Politique de confidentialité',
    effective: 'Date d\'effet : 1er janvier 2026 | Dernière mise à jour : 20 février 2026',
    sections: [
      { heading: '1. Présentation', body: 'Pixkit (ci-après « le Service ») est un outil gratuit de traitement d\'images en ligne exploité par un particulier. La présente Politique de confidentialité explique comment les informations personnelles sont traitées lors de l\'utilisation du Service.' },
      { heading: '2. Traitement des données d\'images', body: 'Tous les traitements d\'images dans Pixkit (redimensionnement, recadrage, rotation, conversion, conversion PDF, etc.) sont effectués dans le navigateur web de l\'utilisateur. Les images importées par les utilisateurs ne sont ni transmises ni stockées sur des serveurs externes.', list: ['Les fichiers image sont traités uniquement dans la mémoire de l\'appareil de l\'utilisateur.', 'Les résultats du traitement sont téléchargés directement sur l\'appareil de l\'utilisateur.', 'Toutes les données temporaires sont automatiquement supprimées à la fermeture du navigateur.'] },
      { heading: '3. Informations collectées', body: 'Pixkit peut collecter les informations non personnelles suivantes à des fins d\'amélioration et d\'analyse du service :', list: ['Pages visitées et temps passé (via des outils d\'analyse tels que Google Analytics)', 'Type de navigateur, système d\'exploitation, résolution d\'écran', 'URL de provenance (Referrer)'], after: 'Ces informations sont anonymes et ne permettent pas d\'identifier des individus. Elles sont utilisées uniquement pour améliorer la qualité du service.' },
      { heading: '4. Cookies', body: 'Pixkit peut utiliser des cookies pour les outils d\'analyse et les services publicitaires (Google AdSense). Les utilisateurs peuvent refuser la collecte de cookies via les paramètres de leur navigateur, sans que cela n\'affecte l\'utilisation du Service.' },
      { heading: '5. Publicité', body: 'Pixkit peut afficher des publicités via Google AdSense pour financer le fonctionnement du service. Google peut utiliser des cookies pour afficher des annonces basées sur les centres d\'intérêt. Pour plus d\'informations, veuillez consulter la politique de confidentialité publicitaire de Google.' },
      { heading: '6. Divulgation à des tiers', body: 'Pixkit ne vend, n\'échange ni ne loue les informations personnelles des utilisateurs à des tiers. Toutefois, des informations peuvent être fournies conformément aux lois applicables en cas de demande légale.' },
      { heading: '7. Protection des données des enfants', body: 'Pixkit ne collecte pas sciemment d\'informations personnelles auprès d\'enfants de moins de 14 ans. Si nous apprenons que des informations personnelles d\'un enfant de moins de 14 ans ont été collectées, nous les supprimerons immédiatement.' },
      { heading: '8. Modifications de la politique', body: 'La présente Politique de confidentialité peut être modifiée en fonction de l\'évolution des lois ou des politiques du service. Les mises à jour seront publiées sur cette page et les modifications importantes seront communiquées via des notifications dans le service.' },
      { heading: '9. Contact', body: 'Si vous avez des questions concernant cette Politique de confidentialité, veuillez nous contacter aux coordonnées ci-dessous.', contact: true },
    ],
  },
  es: {
    title: 'Política de privacidad',
    effective: 'Fecha de vigencia: 1 de enero de 2026 | Última actualización: 20 de febrero de 2026',
    sections: [
      { heading: '1. Descripción general', body: 'Pixkit (en adelante "el Servicio") es una herramienta gratuita de procesamiento de imágenes en línea operada por un individuo. Esta Política de privacidad explica cómo se maneja la información personal al utilizar el Servicio.' },
      { heading: '2. Procesamiento de datos de imagen', body: 'Todo el procesamiento de imágenes en Pixkit (redimensionar, recortar, rotar, convertir, conversión a PDF, etc.) se realiza dentro del navegador web del usuario. Las imágenes cargadas por los usuarios no se transmiten ni se almacenan en servidores externos.', list: ['Los archivos de imagen se procesan únicamente en la memoria del dispositivo del usuario.', 'Los resultados procesados se descargan directamente al dispositivo del usuario.', 'Todos los datos temporales se eliminan automáticamente al cerrar el navegador.'] },
      { heading: '3. Información que recopilamos', body: 'Pixkit puede recopilar la siguiente información no personal para mejorar y analizar el servicio:', list: ['Páginas visitadas y tiempo de uso (a través de herramientas de análisis como Google Analytics)', 'Tipo de navegador, sistema operativo, resolución de pantalla', 'URL de referencia (Referrer)'], after: 'Esta información es anónima y no permite identificar a personas individuales. Se utiliza únicamente para mejorar la calidad del servicio.' },
      { heading: '4. Cookies', body: 'Pixkit puede utilizar cookies para herramientas de análisis y servicios publicitarios (Google AdSense). Los usuarios pueden rechazar la recopilación de cookies a través de la configuración del navegador, lo cual no afectará el uso del Servicio.' },
      { heading: '5. Publicidad', body: 'Pixkit puede mostrar anuncios a través de Google AdSense para apoyar las operaciones del servicio. Google puede utilizar cookies para mostrar anuncios basados en intereses. Para más información, consulte la política de privacidad publicitaria de Google.' },
      { heading: '6. Divulgación a terceros', body: 'Pixkit no vende, intercambia ni alquila información personal de los usuarios a terceros. Sin embargo, se puede proporcionar información de acuerdo con las leyes aplicables cuando sea requerido por solicitudes legales.' },
      { heading: '7. Privacidad de menores', body: 'Pixkit no recopila intencionalmente información personal de menores de 14 años. Si descubrimos que se ha recopilado información personal de un menor de 14 años, eliminaremos dicha información de inmediato.' },
      { heading: '8. Cambios en la política', body: 'Esta Política de privacidad puede modificarse de acuerdo con cambios en las leyes o políticas del servicio. Las actualizaciones se publicarán en esta página y los cambios significativos se comunicarán mediante notificaciones dentro del servicio.' },
      { heading: '9. Contacto', body: 'Si tiene alguna pregunta sobre esta Política de privacidad, contáctenos a través de la información a continuación.', contact: true },
    ],
  },
};

const contactInfo = {
  ko: { service: '서비스명', operator: '운영자', opValue: '개인 운영', email: '이메일' },
  en: { service: 'Service', operator: 'Operator', opValue: 'Individual', email: 'Email' },
  ja: { service: 'サービス名', operator: '運営者', opValue: '個人運営', email: 'メール' },
  zh: { service: '服务名称', operator: '运营者', opValue: '个人运营', email: '邮箱' },
  fr: { service: 'Service', operator: 'Opérateur', opValue: 'Individuel', email: 'E-mail' },
  es: { service: 'Servicio', operator: 'Operador', opValue: 'Individual', email: 'Correo electrónico' },
};

export default async function PrivacyPage({ params }) {
  const { locale } = await params;
  const c = content[locale] || content.ko;
  const ci = contactInfo[locale] || contactInfo.ko;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold font-heading mb-6">{c.title}</h1>
      <p className="text-text-muted text-sm mb-8">{c.effective}</p>

      <div className="prose-custom space-y-8 text-text-secondary text-sm leading-relaxed">
        {c.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-lg font-semibold text-text-primary mb-3">{s.heading}</h2>
            <p>{s.body}</p>
            {s.list && (
              <ul className="list-disc pl-5 mt-2 space-y-1">
                {s.list.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            )}
            {s.after && <p className="mt-2">{s.after}</p>}
            {s.contact && (
              <p className="mt-2">{ci.service}: Pixkit<br />{ci.operator}: {ci.opValue}<br />{ci.email}: buyornotcommittee@gmail.com</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
