import React, { useState } from 'react';
import { Button, Text, Link } from '@fluentui/react-components';
import { CopilotMessage } from '@fluentui-copilot/react-copilot-chat';
import { AgentIcon } from '../core/AgentIcon';
import styles from './McpApprovalCard.module.css';

interface OAuthConsentCardProps {
  consentLink: string;
  serverLabel: string;
  onRetry?: () => void;
  agentName?: string;
  agentLogo?: string;
}

export const OAuthConsentCard: React.FC<OAuthConsentCardProps> = ({
  consentLink,
  serverLabel,
  onRetry,
  agentName = 'AI Assistant',
  agentLogo,
}) => {
  const [hasAuthorized, setHasAuthorized] = useState(false);

  const handleAuthorize = () => {
    window.open(consentLink, '_blank', 'noopener,noreferrer');
    setHasAuthorized(true);
  };

  return (
    <CopilotMessage
      avatar={<AgentIcon logoUrl={agentLogo} />}
      name={agentName}
      loadingState="none"
      className={styles.message}
    >
      <div className={styles.content}>
        <Text className={styles.title}>
          Authorization required for <strong>{serverLabel}</strong>
        </Text>
        <Text>
          The agent needs access to an external service. Authorize and then continue the conversation.
        </Text>
        <div className={styles.actions}>
          {!hasAuthorized ? (
            <Button
              appearance="primary"
              onClick={handleAuthorize}
            >
              Authorize {serverLabel}
            </Button>
          ) : (
            <Button
              appearance="primary"
              onClick={onRetry}
              disabled={!onRetry}
            >
              Continue conversation
            </Button>
          )}
        </div>
        <Text size={200}>
          <Link onClick={handleAuthorize} style={{ cursor: 'pointer' }}>
            Open authorization link
          </Link>
        </Text>
      </div>
    </CopilotMessage>
  );
};
