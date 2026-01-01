# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

Please report (suspected) security vulnerabilities to **[security@example.com](mailto:security@example.com)**. You will receive a response within 48 hours. If the issue is confirmed, we will release a patch as soon as possible depending on complexity but historically within a few days.

## Security Best Practices

When using this project:

1. **Keep dependencies updated**: Regularly update npm dependencies to receive security patches
2. **Review code changes**: Always review code changes before deploying to production
3. **Use environment variables**: Never commit API keys or sensitive data to the repository
4. **Enable security headers**: Configure appropriate security headers in your deployment environment
5. **Regular audits**: Run `npm audit` regularly to check for known vulnerabilities

## Known Security Considerations

- This is a frontend application. All API keys and sensitive operations should be handled by a secure backend service.
- The application uses external CDN resources (Tailwind CSS, Google Fonts). Consider self-hosting these resources for production deployments requiring strict security policies.
