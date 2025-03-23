import React from 'react';
import {Col, Row} from "react-bootstrap";
import {FeatureCard} from "./FeatureCard.jsx";
import {AnimatedSection} from "./AnimatedSection.jsx";
import {t} from "i18next";

export function FeaturesSection(props) {
    return (
        <>
            <section>
                <Row className="gx-0 primary p-5">
                    <Col xl={4}>
                        <AnimatedSection>
                            <FeatureCard
                                title={t("home.featureTitle1")}
                                description={t("home.featureDescription1")}
                                icon="building"
                            >
                            </FeatureCard>
                        </AnimatedSection>
                    </Col>
                    <Col xl={4}>
                        <AnimatedSection>
                            <FeatureCard
                                title={t("home.featureTitle2")}
                                description={t("home.featureDescription2")}
                                icon="star-fill"
                            >
                            </FeatureCard>
                        </AnimatedSection>
                    </Col>
                    <Col xl={4}>
                        <AnimatedSection>
                            <FeatureCard
                                title={t("home.featureTitle3")}
                                description={t("home.featureDescription3")}
                                icon="coin"
                            >
                            </FeatureCard>
                        </AnimatedSection>
                    </Col>
                </Row>
            </section>
        </>
    );
}