# THE SPECIFICATION. This is the source of truth for the behavior.
# Rules: behavior (not implementation) · domain language ·
# one scenario = one observable behavior · cover errors and edges.
# Mark anything left to define with:  # TODO(clarify): ...

@v1
Feature: <feature name>
  In order to <benefit / why>
  As a <role / persona>
  I want <capability>

  Background:
    Given <precondition common to all scenarios>

  @critical
  Scenario: <happy path — one observable behavior>
    Given <initial state in domain terms>
    When <user/system action>
    Then <observable result>

  Scenario: <edge rule / error>
    Given <edge condition>
    When <action>
    Then <expected behavior for the error case>

  # Use Scenario Outline for data variations instead of copying scenarios.
  Scenario Outline: <rule with variations>
    Given <state with <parameter>>
    When <action>
    Then <result with <expected>>

    Examples:
      | parameter | expected |
      | value A   | output A |
      | value B   | output B |
