<script setup lang="ts">
definePageMeta({ layout: 'marketing', i18n: false })
useSeoMeta({
  title: 'Data Processing Agreement (DPA)',
  description: 'Review the Denalify data processing agreement template and request an executable copy.',
})
defineOgImage('Denalify', {
  title: 'Data Processing Agreement',
  description: 'The terms that apply when Denalify processes personal data for a customer.',
  label: 'LEGAL / DPA',
})

const requestHref = 'mailto:contact@denalify.com?subject=Denalify%20DPA%20request'
</script>

<template>
  <LegalArticle
    eyebrow="LEGAL / DPA"
    title="Data Processing Agreement"
    introduction="The terms that apply when Denalify processes personal data on a customer’s behalf."
    updated="Template updated: 1 October 2026"
  >
    <div class="legal-notice">
      <p><strong>This page is a review template, not an automatically executed agreement.</strong> To identify the customer, effective date and authorized signatories, <a :href="requestHref">request an executable copy</a>. Your legal team should review it for your use case.</p>
    </div>

    <h2>1. Parties and scope</h2>
    <p>This Data Processing Agreement (“DPA”) is between the customer identified in the executed copy (“Customer”) and Patryk Dąbrowski, Młyńska 5/1, 88-100 Inowrocław, Poland, operating Denalify (“Denalify”). It supplements the agreement under which Denalify provides the service.</p>
    <p>Customer is the controller and Denalify is the processor where Denalify handles personal data contained in Customer’s workspace solely to provide, secure, support and maintain the service. The DPA applies for the subscription term and for the limited period needed to return or delete data afterwards.</p>

    <h2>2. Documented instructions</h2>
    <p>Denalify will process Customer personal data only on documented instructions from Customer, including instructions expressed through normal use and configuration of the service, unless applicable law requires other processing. If legally permitted, Denalify will inform Customer before processing required by law.</p>
    <p>Customer is responsible for the lawfulness of its instructions, notices to data subjects and the personal data it places in Denalify.</p>

    <h2>3. Confidentiality and people</h2>
    <p>Denalify will ensure that people authorized to process Customer personal data are bound by confidentiality and receive access only where needed for their work. Access will be removed when it is no longer required.</p>

    <h2>4. Security</h2>
    <p>Denalify will maintain technical and organizational measures appropriate to the risk. Current measures include:</p>
    <ul>
      <li>TLS encryption for data in transit and password hashing;</li>
      <li>user two-factor authentication, with organization-wide enforcement available on Team;</li>
      <li>role, membership and project-access controls;</li>
      <li>private Cloudflare R2 object storage in the EU jurisdiction, with short-lived signed file links;</li>
      <li>audit logs and optional SIEM forwarding on applicable plans;</li>
      <li>account export, deletion and security-event investigation processes.</li>
    </ul>
    <p>Customer remains responsible for configuring access, protecting its credentials and using the controls appropriate to its risk.</p>

    <h2>5. Personal-data breach</h2>
    <p>After becoming aware of a personal-data breach affecting Customer personal data, Denalify will notify Customer without undue delay and provide information reasonably available to help Customer meet its legal obligations. Denalify may provide information in phases as the investigation develops. Contact for suspected incidents: <a href="mailto:contact@denalify.com">contact@denalify.com</a>.</p>

    <h2>6. Assistance</h2>
    <p>Taking account of the nature of processing and the information available, Denalify will reasonably assist Customer with data-subject requests, security assessments, breach notifications and data-protection impact assessments. Customer can use the service’s export and deletion controls and may contact Denalify where those controls are insufficient.</p>

    <h2>7. Sub-processors</h2>
    <p>Customer gives general authorization for the sub-processors listed below. Denalify remains responsible for imposing materially equivalent data-protection obligations on them and will provide advance notice of a new or replacement sub-processor where required, so Customer can raise a reasonable data-protection objection.</p>
    <ul>
      <li><strong>Hetzner Online GmbH — European Union:</strong> infrastructure hosting for the application, database and self-hosted email service.</li>
      <li><strong>Cloudflare, Inc. — EU data jurisdiction:</strong> private R2 object storage and delivery of uploaded files.</li>
    </ul>
    <p>Paddle.com handles payment data as merchant of record under its own applicable terms. Integrations such as Google, GitHub, Discord or Slack are enabled and directed by Customer and may receive data selected by Customer.</p>

    <h2>8. International transfers</h2>
    <p>Denalify will not transfer Customer personal data outside the EEA unless the transfer is covered by an adequacy decision or appropriate safeguards required by data-protection law. On request, Denalify will provide information about the safeguard relevant to a transfer.</p>

    <h2>9. Return and deletion</h2>
    <p>At the end of the service, Customer may export its data using the available controls. On Customer’s request, Denalify will delete or return Customer personal data and delete remaining copies, unless applicable law requires retention. Limited records may be retained for security, dispute or legal-compliance purposes as described in the <NuxtLink to="/privacy">privacy notice</NuxtLink>.</p>

    <h2>10. Information and audits</h2>
    <p>Denalify will provide information reasonably necessary to demonstrate compliance with this DPA and Article 28 GDPR. If that information is insufficient, Customer may request a proportionate audit or inspection, subject to reasonable notice, confidentiality, security and avoidance of disruption to other customers.</p>

    <h2>11. Processing details</h2>
    <ul>
      <li><strong>Subject matter and purpose:</strong> hosting, organizing, transmitting, securing and supporting Customer’s workspace and the collaboration features Customer chooses to use.</li>
      <li><strong>Nature of processing:</strong> collection, storage, organization, retrieval, display, transmission, restriction, export and deletion.</li>
      <li><strong>Data subjects:</strong> Customer users, members, contractors, clients, suppliers and other people identified in workspace content.</li>
      <li><strong>Personal data:</strong> account and profile details, memberships, project and task content, comments, documents, uploaded files, integration data, activity and security logs, and support communications.</li>
      <li><strong>Sensitive data:</strong> the service is not designed for special-category data. Customer must not upload it unless the parties first document appropriate instructions and safeguards.</li>
    </ul>

    <h2>12. Order of precedence and contact</h2>
    <p>If this DPA conflicts with the service agreement on processing Customer personal data, the executed DPA controls. Other terms of the service agreement remain unchanged.</p>
    <p>This template reflects the processor obligations in <a href="https://eur-lex.europa.eu/eli/reg/2016/679/art_28/oj">Article 28 GDPR</a>. The European Commission also publishes <a href="https://commission.europa.eu/publications/standard-contractual-clauses-controllers-and-processors-eueea_en">standard contractual clauses for controllers and processors in the EU/EEA</a>. To request an executable Denalify DPA or propose Customer paper, email <a :href="requestHref">contact@denalify.com</a>.</p>
  </LegalArticle>
</template>
